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
	contacts: [{
		type: Schema.Types.ObjectId, ref: 'User'
	}],
	role: {
		type: String,
		enum: ['Member', 'Client', 'Owner', 'Admin'],
		default: 'Member'
	},
	resetPasswordToken: { type: String },
	resetPasswordExpires: { type: Date }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
	var user = this,
	    SALT_FACTOR = 5;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) return nesxt(err);
			user.password = hash;
			next();
		});
	});
});

// Compare user password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}

		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema, 'User');