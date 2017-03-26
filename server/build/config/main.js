'use strict';

module.exports = {
	'secret': 'secret', // temp?
	// 'database': 'mongodb://localhost:27017/chatApp',
	'database': 'mongodb://heroku_djrv4shx:3q2trf5i3gbddvd8dtgpa0u2ca@ds139959.mlab.com:39959/heroku_djrv4shx',
	'port': process.env.PORT || 3001,
	// mailgun config:
	'mailgun_priv_key': 'key-728d106a56681eab30e04ef06819bc4a',
	'mailgun_domain': 'sandbox4fc771de5236465e9e5d91ae2fd03616.mailgun.org'
};