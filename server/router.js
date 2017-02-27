const AuthenticationController = require('./controllers/authentication'),
			ChatController = require('./controllers/chat'),
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
				authRoutes = express.Router(),
				chatRoutes = express.Router();

	// Auth routes

	apiRoutes.use('/auth', authRoutes);

	authRoutes.post('/register', AuthenticationController.register);

	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	authRoutes.get('/test', function(req, res, next) {
		res.status(200).json({message: 'it works'});
		return next();
	});

	// Chat routes
	apiRoutes.use('/chat', chatRoutes);

	// BUG: ChatController."methodname" is undefined
	chatRoutes.get('/messages', ChatController.getMessages);
	chatRoutes.post('/messages', ChatController.postMessage);


	app.use('/api', apiRoutes);
};