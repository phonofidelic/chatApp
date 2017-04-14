'use strict';
'use-strict';

var User = require('../models/user');
var Promise = require('bluebird');
var mailgun = require('../config/mailgun');

var setUserInfo = function setUserInfo(request) {
	var getUserInfo = {
		_id: request._id,
		username: request.profile.username,
		email: request.email,
		contacts: request.contacts,
		role: request.role
	};

	return getUserInfo;
};

exports.viewProfile = function (req, res, next) {
	var userId = req.params.userId;

	if (req.user._id.toString() !== userId) {
		res.status(401).json({ error: 'You are not authorized to view this profile.' });
		return next();
	}
	User.findById(userId, function (err, user) {
		if (err) {
			res.status(400).json({ error: "No user could be found with this ID." });
			return next(err);
		}

		var userToReturn = setUserInfo(user);

		return res.status(200).json({ user: userToReturn });
	});
};

// exports.getContacts = function(req, res, next) {
// 	const userId = req.params.userId;

// 	if (req.user._id.toString() !== userId) {
// 		res.status(401).json({ error: 'You are not authorized to view this profile.' });
// 		return next();
// 	}
// };

exports.addNewContact = function (req, res, next) {
	var userId = req.params.userId;
	var newContact = req.params.contactUserId;

	User.findByIdAndUpdate(userId, { $push: { 'contacts': newContact } }, function (err, savedContact) {
		if (err) {
			res.send({ error: err });
			return next(err);
		}

		res.status(200).json({ message: 'New contact added!', contactAdded: newContact });
	});
};

exports.inviteNewContact = function (req, res, next) {
	var recipient = req.body.recipient;
	var message = {
		html: '<html><body>' + req.body.username + ' added you as a new contact! <br>Click the link to accept: <a href="' + req.body.confirmationLink + '">Create account</a></body></html>',
		subject: 'PhonoChat invite!'
	};

	// create reference to new user

	mailgun.sendEmail(req.body.userEmail, recipient, message);
};

exports.getContacts = function (req, res, next) {
	var userId = req.params.userId;
	var contacts = req.body.contacts;

	var foundUsers = [];

	contacts.forEach(function (contact) {
		User.find({ '_id': contact }).select('profile.username _id').exec(function (err, foundUser) {
			if (err) {
				res.send({ error: err });
				return next(err);
			}
			foundUsers.push(foundUser);
			if (foundUsers.length === contacts.length) {
				return res.status(200).json(foundUsers);
			}
		});
	});
};

exports.getUserList = function (req, res, next) {
	User.find({}).exec(function (err, users) {
		if (err) return next(err);
		res.status(201).json(users);
	});
};

exports.checkForUser = function (req, res, next) {
	console.log('@checkForUser:', req.params.email);
	User.findOne({ 'email': req.params.email.toLowerCase() }, 'email').exec(function (err, user) {
		if (err) return next(err);

		console.log('### user:', user);

		if (user) {
			return res.status(200).json({ message: user.email });
		} else {
			return res.status(200).json({ message: 'Username is available!' });
		}
	});
};

exports.test = function (req, res, next) {
	// res.status(200).json(req.user.id_toString());
	console.log('test', req.params);
};