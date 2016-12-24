var jwt    = require('jsonwebtoken');

var models = require('../models');
var users = models.users;

module.exports = {

  login: function (req, res, next) {
		var username = req.body.username;
		var password = req.body.password;

		users.findOne({
			where: { username: username }
		})
		.then(function(user) {
			if (!user) {
				res.status(400).send({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {

				if (user.hashed_password != password) {
					res.status(400).json({ success: false, message: 'Authentication failed. Wrong Password.' });
				} else {
					var payload = { username: username, password: password };

					var token = jwt.sign(payload, req.app.get('superSecret'), {
						expiresIn: 1440 // expires in 24 hours
					});

					res.status(200).json({ success: true, message: 'Enjoy Your Token.', token: token });
				}

			}
		})
	}

}
