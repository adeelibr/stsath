const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

var models = require('../models');
var Logs = models.logs;

module.exports = {

	getAllLogs: function (req, res, next) {

		let limit = parseInt(req.query.limit) || 100;
		let offset = parseInt(req.query.offset) || 0;

		req.query.limit ? delete req.query['limit'] : null;
		req.query.offset ? delete req.query['offset'] : null;

		Logs.findAll({
			where: req.query,
			limit: limit,
			offset: offset,
			include: [models.users]
		})
		.then((logs) => {
			return res.status(200).json({ success: true, message: "List of All Logs", logs }).end();
		})
		.catch((error) => {
			return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
		});
	},

	deleteLogById: function (req, res, next) {
		var id = req.params.id;
		Logs.destroy({ where: { id: id }})
			.then((data) => {
				if (!data) {
					return res.status(400).json({ success: false, message: 'Log Not Deleted' }).end();
				}
				return res.status(200).json({ success: true, message: 'Succesfully deleted log' }).end();
			})
			.catch((error) => {
				console.log(error);
				return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
			});
	},
};
