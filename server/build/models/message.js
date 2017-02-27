'use strict';
'use-strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sortReplies = function sortReplies(a, b) {
	return a.createdAt - b.createdAt;
};

var ReplySchema = new Schema({
	text: String,
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() }
});

ReplySchema.method('update', function (updates, callback) {
	(0, _assign2.default)(this, updates, { updatedAt: new Date.now() });
	this.parent.save(callback);
});

var MessageSchema = new Schema({
	text: String,
	createdAt: { type: Date, default: Date.now() },
	replies: [ReplySchema]
});

MessageSchema.pre('save', function (next) {
	this.replies.sort(sortReplies);
	next();
});

var Message = mongoose.model('Messages', MessageSchema);

module.exports.Message = Message;