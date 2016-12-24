var models = require('../models');
var users = models.users;

module.exports = {

	getUser: function (req, res, next) {
		var id = req.params.id;
		var user = req.user;

		if (!id) {
			return res.status(400).send({ "error": "Parameter is missing" }).end();
		}

    return res.status(200).send({ "user": id, "asd": user }).end();
		// User.findOne({
		// 	where: { id : id }
		// })
		// .then(function(user) {
		// 	if(user === null) {
		// 		return res.status(400).send({"msg": "No User Found"}).end();
		// 	}
		// 	return res.status(200).send(user).end();
		// })
		// .catch(function(err) {
		// 	console.log(err);
		// 	return res.status(500).send({"msg": "Internal Server Error"}).end();
		// })
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
			return res.status(200).send({ "user": u }).end();
		})

	},

	delete: function (req, res, next) {
			return res.status(200).send({ "user": "u" }).end();
	}

}
