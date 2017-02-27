'use-strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sortReplies = function(a, b) {
	return a.createdAt - b.createdAt; 
}

var ReplySchema = new Schema({
	text: String,
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now()}
});

ReplySchema.method('update', function(updates, callback) {
	Object.assign(this, updates, { updatedAt: new Date.now() });
	this.parent.save(callback);
});

var MessageSchema = new Schema({
	text: String,
	createdAt: { type: Date, default: Date.now() },
	replies: [ReplySchema]
});

MessageSchema.pre('save', function(next) {
	this.replies.sort(sortReplies);
	next();
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;