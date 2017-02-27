'use-strict';
const User = require('../models/user');

const setUserInfo = function setUserInfo(request) {
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
	}
	User.findById(userId, (err, user) => {
		if (err) {
			res.status(400).json({ error: "No user could be found with this ID." });
			return next(err);
		}

		const userToReturn = setUserInfo(user);

		return res.status(200).json({ user: userToReturn });
	});
}