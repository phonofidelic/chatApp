const config = require('./main');
const mailgun = require('mailgun-js')({ 
	apiKey: config.mailgun_priv_key,
  domain: config.mailgun_domain 
});

exports.sendEmail = function(sender, recipient, message) {
	const data = {
		from: sender,
		to: recipient,
		subject: message.subject,
		html: message.html
	};

	mailgun.messages().send(data, (error, body) => {
		if (error) {
			console.log('@mailgun.messages().send error:', error);
		}
		console.log('@mailgun.messages().send:', body);
	});
};