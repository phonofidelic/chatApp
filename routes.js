'use-strict';

var express = require('express');
var router = express.Router();
var Message = require('./models').Message;

router.param('mID', function(req, res, next, id) {
	Message.findById(id, function(err, doc) {
		if (err) return next(err);
		if (!doc) {
			err = new Error('Not found (no doc)');
			err.status = 404;
			return next(err);
		}
		req.message = doc;
		return next();
	});
});

router.param('rID', function(req, res, next, id) {
	req.reply = req.message.replies.id(id);
	if (!req.reply) {
		err = new Error('Not found (no reply obj)');
		err.status = 404;
		return next(err);
	}
	next();
});

// GET /messages
// Route for messages collection
router.get('/', function(req, res, next) {
	Message.find({})
		   .sort({createdAt: -1})
		   .exec(function(err, messages) {
				if (err) return next(err);
				res.json(messages);
			});
});

// POST /messages
// Route for creating  new messages
router.post('/', function(req, res, next) {
	var message = new Message(req.body);
	message.save(function(err, message) {
		if (err) return next(err);
		res.status(201);
		res.json(message);
	});
});

// GET /messages/:mID
// Route for specific message
router.get('/:mID', function(req, res, next) {
	// res.json({"hello": "world"});
	res.json(req.message);
	console.log('response:', req.message);
});

// POST /messages/:mID/replies
// Route for creating a reply
router.post('/:mID/replies', function(req, res, next) {
	// console.log('## req.message:', req);
	req.message.replies.push(req.body);
	req.message.save(function(err, message) {
		if (err) return next(err);
		res.status(201);
		res.json(message);
	});
});

// PUT /messages/:mID/replies/:rID
// Edit a specific reply
router.put('/:mID/replies/:rID', function(req, res, next) {
	req.reply.update(req.body, function(err, result) {
		if (err) return next(err);
		res.json(result);
	});
});

// DELETE /messages/:mID/replies/:rID
// Delete a specific reply
router.delete('/:mID/replies/:rID', function(req, res, next) {
	res.reply.remove(function(err) {
		req.message.save(function(err, message) {
			if (err) next(err);
			res.json(message);
		});
	});
});

module.exports = router;