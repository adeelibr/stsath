const validator = require('validator');

var models = require('../models');
var Users = models.users;

module.exports = {

	getUser: function (req, res, next) {
		var id = req.params.id;
		var user = req.user;

		if (!id) {
			return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
		}

		Users.findOne({
			where: { id : id }
		})
		.then((user) => {
			if(user === null) {
				return res.status(400).json({ success: false, message: "No User Found" }).end();
			}
			return res.status(200).json({ success: true, user }).end();
		})
		.catch(function(err) {
			console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
	}, // end of getUser

	updateUserInfo: function (req, res, next) {
		const validateResult = validateUpdateUserInfoFormBody(req.body)
		if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

		let user = req.body;
		let id = req.params.id;

		Users.update(user, {
			where: {
				id: id
			}
		})
		.then((data) => {
			return Users.findOne({ where: { id : id } });
		})
		.then((data) => {
			return res.status(200).json({ success: true, message: 'Succesfully updated account', user: data }).end();
		})
		.catch((error) => {
			console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
	},

	delete: function (req, res, next) {
		return res.status(200).send({ "user": "u" }).end();
	},

	getAllUser: function (req, res, next) {
		Users.findAll({})
		.then((users) => {
			if(users === null) {
				return res.status(200).json({ success: false, message: "No Users Exist" }).end();
			}
			return res.status(200).json({ success: true, users }).end();
		})
	},

}

function validateUpdateUserInfoFormBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your Username';
  }

  if (!payload || typeof payload.first_name !== 'string' || payload.first_name.trim().length === 0) {
    isFormValid = false;
    errors.first_name = 'Please provide your First Name';
  }

  if (!payload || typeof payload.last_name !== 'string' || payload.last_name.trim().length === 0) {
    isFormValid = false;
    errors.last_name = 'Please provide your Last Name';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email) ) {
    isFormValid = false;
    errors.email = 'Please provide your Email';
  }

  if (!isFormValid) {
    message = 'Check the form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}
