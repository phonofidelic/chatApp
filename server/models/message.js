'use-strict';
const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

// adapted from Treehouse tutorial

// var sortReplies = function(a, b) {
// 	return a.createdAt - b.createdAt; 
// }

// var ReplySchema = new Schema({
// 	text: String,
// 	createdAt: { type: Date, default: Date.now() },
// 	updatedAt: { type: Date, default: Date.now()}
// });

// ReplySchema.method('update', function(updates, callback) {
// 	Object.assign(this, updates, { updatedAt: new Date.now() });
// 	this.parent.save(callback);
// });

// var MessageSchema = new Schema({
// 	text: String,
// 	createdAt: { type: Date, default: Date.now() },
// 	replies: [ReplySchema]
// });

// MessageSchema.pre('save', function(next) {
// 	this.replies.sort(sortReplies);
// 	next();
// });

// module.exports = mongoose.model('Message', MessageSchema);

//##################################################################

// folowing slatespeak tutorial
const  MessageSchema = new Schema({
	conversationId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}, 
}, 
{
	timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);