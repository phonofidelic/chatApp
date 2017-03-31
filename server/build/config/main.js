'use strict';

module.exports = {
	'secret': 'secret', // temp?
	// 'database': 'mongodb://localhost:27017/chatApp',
	'database': process.env.MONGODB_URI || 'mongodb://localhost:27017/chatApp',
	'port': process.env.PORT || 3001,
	// mailgun config:
	'mailgun_priv_key': 'key-728d106a56681eab30e04ef06819bc4a',
	'mailgun_domain': 'sandbox4fc771de5236465e9e5d91ae2fd03616.mailgun.org'
};