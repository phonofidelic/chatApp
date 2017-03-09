'use-strict';
const User = require('../models/user');

const setUserInfo = function(request) {
  const getUserInfo = {
    _id: request._id,
    username: request.profile.username,
    email: request.email,
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