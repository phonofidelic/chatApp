const AuthenticationController = require('./controllers/authentication'),
			ChatRouter = require('./controllers/chatRoutes'),
			express = require('express'),
			passportService = require('./config/passport'),
			passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Role types
const REQUIRE_ADMIN = "Admin",
			REQUIRE_OWNER =	"Owner",
			REQUIRE_CLIENT = "Client",
			REQUIRE_MEMBER = "Member";

module.exports = function(app) {
	const apiRoutes = express.Router(),
				authRoutes = express.Router();

	// Auth routes

	apiRoutes.use('/auth', authRoutes);

	authRoutes.post('/register', AuthenticationController.register);

	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	app.use('/api', apiRoutes);
};