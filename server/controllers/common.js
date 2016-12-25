var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

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

        console.log(password);
        console.log(user.hashed_password);
        console.log(bcrypt.compareSync(req.body.password, user.hashed_password));

        if (!bcrypt.compareSync(req.body.password, user.hashed_password)) {
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
	},

  signup: function (req, res, next) {

		var user = {
			username: req.body.username,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			hashed_password: bcrypt.hashSync(req.body.password),
		};

		users.create({
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			hashed_password: user.hashed_password,
		})
		.then(function(u) {
			return res.status(200).json({ success: true, user: u }).end();
		})

	}

}
