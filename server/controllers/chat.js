'use-strict';
const Message = require('../models/message');

exports.getMessages = function(req, res, next) {
	Message.find({})
		   .sort({createdAt: -1})
		   .exec(function(err, messages) {
				if (err) return next(err);
				res.json(messages);
			});
};

exports.postMessage = function(req, res, next) {
	let message = new Message(req.body);
	message.save(function(err, message) {
		if (err) return next(err);
		res.status(201);
		res.json(message);
	});
};