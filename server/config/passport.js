const passport = require('passport'),
		  User = require('../models/user'),
		  config = require('./main'),
		  JwtStrategy = require('passport-jwt').Strategy,
		  ExtractJwt = require('passport-jwt').ExtractJwt,
		  LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.secret
};

// Set up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	User.findOne({ email: email }, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

			return done(null, user);
		});
	});
});

// Set up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload._id, function(err, user) {
		if (err) { return done(err, fale); }

		if (user) {
			done(null, user);
		} else {
			done(null, false)
		}
	});
});
// Please note, some people have had issues with this step. 
// Depending on your setup, you might need to replace payload._id with 
// payload.doc._id or payload.document._id. When in doubt, 
// add console.log(payload); to your code and search the console for 
// the right user ID if you are always getting the same user back when 
// logging in different user accounts.

passport.use(jwtLogin);
passport.use(localLogin);