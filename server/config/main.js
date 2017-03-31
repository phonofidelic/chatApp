require('dotenv').config();
module.exports = {
	'secret': process.env.JWT_SECRET,
	'database': process.env.MONGODB_URI || 'mongodb://localhost:27017/chatApp',
	'port': process.env.PORT || 3001,
	'mailgun_priv_key': process.env.MAILGUN_PRIV_KEY || 'key-728d106a56681eab30e04ef06819bc4a',
	'mailgun_domain': 'sandbox4fc771de5236465e9e5d91ae2fd03616.mailgun.org'
}