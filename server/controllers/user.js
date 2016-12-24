var models = require('../models');
var users = models.users;

module.exports = {

	getAllUser: function (req, res, next) {
		users.findAll({})
		.then(function(users) {
			if(users === null) {
				return res.status(200).json({ success: false, message: "No Users Exist" }).end();
			}
			return res.status(200).json({ success: true, users: users }).end();
		})
	},

	getUser: function (req, res, next) {
		var id = req.params.id;
		var user = req.user;

		if (!id) {
			return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
		}

		users.findOne({
			where: { id : id }
		})
		.then(function(user) {
			if(user === null) {
				return res.status(400).json({ success: false, message: "No User Found" }).end();
			}
			return res.status(200).json({ success: true, user: user }).end();
		})
		.catch(function(err) {
			console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
	}, // end of getUser

	create: function (req, res, next) {

		var user = {
			username: req.body.username,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
		};

		users.create({
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			hashed_password: user.password,
		})
		.then(function(u) {
			return res.status(200).json({ success: true, user: u }).end();
		})

	},

	delete: function (req, res, next) {
			return res.status(200).send({ "user": "u" }).end();
	}

}
