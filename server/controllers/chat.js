'use-strict';


const Conversation = require('../models/conversation'),
			Message = require('../models/message'),
			User = require('../models/user');


// old setup
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

// ##########################################################

exports.getConversations = function(req, res, next) {
	// Return one message from conversation to display as snippet
	Conversation.find({ participants: req.user._id })
	.select('_id')
	.exec(function(err, conversations) {
		if (err) {
			res.sent({ error: err });
			return next(err);
		}

		// Set up empty array to hold conversations + most recent message
		let fullConversations = [];
		conversations.forEach(function(conversation) {
			Message.find({ 'conversationId': conversation._id })
				.sort('-createdAt')
				.limit(1)
				.populate({
					path: 'author',
					select: 'profile.username'
				})
				.exec(function(err, message) {
					if (err) {
						res.send({ error: err });
						return next(err);
					}
					fullConversations.push(message);
					fullConversations.sort({updatedAt: -1});
					if (fullConversations.length === conversations.length) {
						return res.status(200).json({ conversations: fullConversations });
					}
				});
		});
	});
};

exports.getConversation = function (req, res, next) {
	console.log('@getConversation:', req.params)
	Message.find({ conversationId: req.params.conversationId })
		.select('createdAt body author')
		.sort('-createdAt')
		.populate({
			path: 'author',
			select: 'profile.username'
		})
		.exec(function(err, messages) {
			if (err) {
				res.send({ error: err });
				return next(err);
			}

			res.status(200).json({ conversation: messages });
		});
};

exports.newConversation = function(req, res, next) {
	console.log('@newConversation:', req.body)
	if (!req.body.recipients) {
		res.status(422).send({ error: 'Please select a recipient for your message.' });
		return next();
	}

	if (!req.body.composedMessage) {
		res.status(422).send({ error: 'Please enter a message.' });
		return next();
	}

	const conversation = new Conversation({
		participants: req.body.recipients
	});

	conversation.save(function(err, newConversation) {
		console.log('@conversation.save:', newConversation)
		console.log('@newConversation:', req.body.composedMessage)
		if (err) {
			res.send({ error: err });
			return next(err);
		}

		const message = new Message({
			conversationId: newConversation._id,
			body: req.body.composedMessage,
			author: req.user._id
		});

		message.save(function(err, newMessage) {
			if (err) {
				res.send({ error: err });
				return next(err);
			}

			res.status(200).json({ message: 'New conversation started!', conversationId: conversation._id });
			return next();
		});
	});
};

exports.removeUserFromConversation = function(req, res, next) {
	// TODO: Remove user from conversation's participants
};

exports.sendReply = function(req, res, next) {
	console.log('@sendReply:', req.params)
	const reply = new Message({
		conversationId: req.params.conversationId,
		body: req.body.composedMessage,
		author: req.user._id
	});

	reply.save(function(err, sentReply) {
		if (err) {
			res.send({ error: err });
			return next(err);
		}

		res.status(200).json({ message: 'Reply successfuly sent!' });
	});
};


// TODO: add delete method for admin role
//			 modify the following:

// DELETE Route to Delete Conversation
// exports.deleteConversation = function(req, res, next) {  
//   Conversation.findOneAndRemove({
//     $and : [
//             { '_id': req.params.conversationId }, { 'participants': req.user._id }
//            ]}, function(err) {
//         if (err) {
//           res.send({ error: err });
//           return next(err);
//         }

//         res.status(200).json({ message: 'Conversation removed!' });
//         return next();
//   });
// }

// PUT Route to Update Message
// exports.updateMessage = function(req, res, next) {  
//   Conversation.find({
//     $and : [
//             { '_id': req.params.messageId }, { 'author': req.user._id }
//           ]}, function(err, message) {
//         if (err) {
//           res.send({ error: err});
//           return next(err);
//         }

//         message.body = req.body.composedMessage;

//         message.save(function (err, updatedMessage) {
//           if (err) {
//             res.send({ error: err });
//             return next(err);
//           }

//           res.status(200).json({ message: 'Message updated!' });
//           return next();
//         });
//   });
// }

