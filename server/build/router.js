'use strict';

var AuthenticationController = require('./controllers/authentication'),
    ChatRouter = require('./controllers/chatRoutes'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport');

// Middleware to require login/auth
var requireAuth = passport.authenticate('jwt', { session: false });
var requireLogin = passport.authenticate('local', { session: false });

// Role types
var REQUIRE_ADMIN = "Admin",
    REQUIRE_OWNER = "Owner",
    REQUIRE_CLIENT = "Client",
    REQUIRE_MEMBER = "Member";

module.exports = function (app) {
			var apiRoutes = express.Router(),
			    authRoutes = express.Router();

			// Auth routes

			apiRoutes.use('/auth', authRoutes);

			authRoutes.post('/register', AuthenticationController.register);

			authRoutes.post('/login', requireLogin, AuthenticationController.login);

			authRoutes.get('/test', function (req, res, next) {
						res.status(200).json({ message: 'it works' });
						return next();
			});

			app.use('/api', apiRoutes);
};