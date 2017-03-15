const AuthenticationController = require('./controllers/authentication'),
			UserController = require('./controllers/user'),
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
				chatRoutes = express.Router(),
				userRoutes = express.Router();

	// Auth routes ***************************************************

	apiRoutes.use('/auth', authRoutes);

	authRoutes.post('/register', AuthenticationController.register);

	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	// Chat routes ***************************************************

	apiRoutes.use('/chat', chatRoutes);

	// // old setup/open chat
	chatRoutes.get('/', ChatController.getMessages);

	chatRoutes.post('/', ChatController.postMessage);

	// get conversations to and from logged in user
	chatRoutes.get('/conversations', requireAuth, ChatController.getConversations);

	// get specific conversation
	chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);

	// reply in conversation
	chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);

	// start new conversation
	chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);

	// User routes ***************************************************

	apiRoutes.use('/user', userRoutes);

	// check username		TODO: move to auth routes
	userRoutes.get('/check/:email', UserController.checkForUser)

	userRoutes.get('/protected', requireAuth, (req, res, next) => {
		res.send({ content: 'Protected test route functioning!' });
	});

	// get get user list 	TODO: move to admin role
	userRoutes.get('/list', UserController.getUserList);

	// view profile
	userRoutes.get('/:userId', requireAuth, UserController.viewProfile);

	// add new contact
	userRoutes.post('/:userId/contacts/add/:contactUserId', requireAuth, UserController.addNewContact);

	app.use(passport.initialize());	// <- sould remove?
	app.use('/api', apiRoutes);
};