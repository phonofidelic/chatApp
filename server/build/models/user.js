'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		username: { type: String }
	},
	role: {
		type: String,
		enum: ['Member', 'Client', 'Owner', 'Admin'],
		default: 'Member'
	},
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Date }
}, {
	timestamps: true
});

// Compare user password for login
UserSchema.methods.comparePassword = function (candidatePassword, cd) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}

		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);