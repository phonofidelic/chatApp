'use strict';
'use-strict';

var jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models/user'),
    config = require('../config/main');

function generateToken(user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 21600 // TODO: set time for production 
	});
};

function setUserInfo(request) {
	return {
		_id: request._id,
		username: request.profile.username,
		email: request.email,
		role: request.role
	};
};

// Login route
exports.login = function (req, res, next) {

	var userInfo = setUserInfo(req.user);

	res.status(200).json({
		token: 'JWT ' + generateToken(userInfo), // remove 'JWT'?	
		user: userInfo
	});
	console.log('@controllers/authentication.js login:', userInfo);
};

// Registration route
exports.register = function (req, res, next) {
	console.log('@registration route');
	// Check for registration errors
	var email = req.body.email,
	    username = req.body.username,
	    password = req.body.password;

	if (!email) {
		return res.status(422).send({ error: 'Please enter an email address.' });
	}

	if (!username) {
		return res.status(422).send({ error: 'Please provide a username.' });
	}

	if (!password) {
		return res.status(422).send({ error: 'Please enter a password.' });
	}

	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		// Check for existing user
		if (existingUser) {
			return res.status(422).send({ error: 'Sorry, that email address is already in use.' });
		}

		var user = new User({
			email: email,
			password: password,
			profile: { username: username }
		});

		user.save(function (err, user) {
			if (err) {
				return next(err);
			}

			// TODO: insert optional email subscripton logic here

			// Respond with JWT if user was created

			var userInfo = setUserInfo(user);

			res.status(201).json({
				token: 'JWT ' + generateToken(userInfo),
				user: userInfo
			});
		});
	});
};

exports.registerWithReference = function (req, res, next) {
	console.log('@registration route');
	// Check for registration errors
	var email = req.body.email,
	    username = req.body.username,
	    password = req.body.password;

	if (!email) {
		return res.status(422).send({ error: 'Please enter an email address.' });
	}

	if (!username) {
		return res.status(422).send({ error: 'Please provide a username.' });
	}

	if (!password) {
		return res.status(422).send({ error: 'Please enter a password.' });
	}

	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		// Check for existing user
		if (existingUser) {
			return res.status(422).send({ error: 'Sorry, that email address is already in use.' });
		}

		var user = new User({
			email: email,
			password: password,
			profile: { username: username },
			contacts: [req.params.referrerId]
		});

		user.save(function (err, user) {
			if (err) {
				return next(err);
			}

			// TODO: insert optional email subscripton logic here

			// Respond with JWT if user was created

			var userInfo = setUserInfo(user);

			res.status(201).json({
				token: 'JWT ' + generateToken(userInfo),
				user: userInfo
			});
		});
	});
};

// Role authorization check
exports.roleAuthorization = function (role) {
	return function (req, res, next) {
		var user = req.user;

		User.findById(user._id, function (err, foundUser) {
			if (err) {
				res.status(422).json({ error: 'No user was found.' });
				return next(err);
			}

			if (foundUser.role == role) {
				return next();
			}

			res.status(401).json({ error: 'You are not authorized to view this content.' });
			return next('Unauthorized');
		});
	};
};