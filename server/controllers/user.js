'use-strict';
const User = require('../models/user');
const Promise = require('bluebird');
const mailgun = require('../config/mailgun');

const setUserInfo = function(request) {
  const getUserInfo = {
    _id: request._id,
    username: request.profile.username,
    email: request.email,
    contacts: request.contacts,
    role: request.role
  };

  return getUserInfo;
};

exports.viewProfile = function(req, res, next) {
	const userId = req.params.userId;

	if (req.user._id.toString() !== userId) {
		res.status(401).json({ error: 'You are not authorized to view this profile.' });
		return next();
	}
	User.findById(userId, (err, user) => {
		if (err) {
			res.status(400).json({ error: "No user could be found with this ID." });
			return next(err);
		}

		const userToReturn = setUserInfo(user);

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

exports.addNewContact = function(req, res, next) {
	const userId = req.params.userId;
	const newContact = req.params.contactUserId;

	User.findByIdAndUpdate(
		userId,
		{ $push: {'contacts': newContact} },
		(err, savedContact) => {
			if (err) {
				res.send({ error: err });
				return next(err);
			}

			res.status(200).json({ message: 'New contact added!', contactAdded: newContact });
		}
	);
};

exports.inviteNewContact = function(req, res, next) {
	const recipient = req.body.recipient;
	const message = {
		html: `<html><body>${req.body.username} added you as a new contact! <br>Click the link to accept: <a href="${req.body.confirmationLink}">Create account</a></body></html>`,
		subject: 'PhonoChat invite!'
	};

	// create reference to new user

	mailgun.sendEmail(req.body.userEmail, recipient, message)
}

exports.getContacts = function(req, res, next) {
	const userId = req.params.userId;
	const contacts = req.body.contacts;

	let foundUsers = [];

	contacts.forEach(contact => {
		User.find({ '_id': contact })
			.select('profile.username _id')
			.exec((err, foundUser) => {
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

exports.getUserList = function(req, res, next) {
	User.find({})
	.exec((err, users) => {
		if (err) return next(err);
		res.status(201).json(users)
	})
};

exports.checkForUser = function(req, res, next) {
	console.log('@checkForUser:', req.params.email)
	User.findOne({'email': req.params.email})
	.exec((err, user) => {
		if (err) return next(err);

		console.log('### user:', user)

		if (user) {
					return res.status(200).json({message: user.email});
				} else {
					return res.status(200).json({message: 'Username is available!'});
				}
	});
};

exports.test = function(req, res, next) {
	// res.status(200).json(req.user.id_toString());
	console.log('test', req.params)
}