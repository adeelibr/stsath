const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

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

	getAllUser: function (req, res, next) {
		Users.findAll({})
		.then((users) => {
			if(users === null) {
				return res.status(200).json({ success: false, message: "No Users Exist" }).end();
			}
			return res.status(200).json({ success: true, users }).end();
		})
	},

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

	updateUserPassword: function (req, res, next) {
		const validateResult = validateUpdateUserPasswordFormBody(req.body)
		if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

		let id = req.params.id;
		let password = req.body;
		let errors = {};

		if (password.newPassword !== password.newPasswordRepeat) {
			errors.newPasswordRepeat = 'Does not match new password field';
			return res.status(400).json({
        success: false, message: 'Check Form For Errors', errors: errors
      }).end();
		}

		let newPassword = bcrypt.hashSync(password.newPassword);

		Users.findOne({ where: { id: id } })
		.then(function(user) {
			if (!user) {
				errors.user = 'User Does Not Exist';
				return res.status(400).json({ success: false, message: 'Check Form For Errors', errors: errors }).end();
			} else {
				if (!bcrypt.compareSync(password.password, user.hashed_password)) {
					errors.password = 'You provided a wrong password';
					return res.status(400).json({ success: false, message: 'Check Form For Errors', errors: errors }).end();
				} else {
					return Users.update({ hashed_password: newPassword }, { where: { id: id } });
				}
			}
		})
		.then((data) => {
			return Users.findOne({ where: { id : id } });
		})
		.then((data) => {
			return res.status(200).json({ success: true, message: 'Succesfully updated password', user: data }).end();
		})
		.catch((error) => {
			// console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		});

	},

	statusUpdate: function (req, res, next) {
		let id = req.params.id || 0;
		// let status = req.body.status;

		Users.findOne({ where: { id : id } })
		.then((user) => {
			if (!user) {
				return res.status(200).json({ success: false, message: 'No Such User Exists' }).end();
			}
			return user;
		})
		.then((user) => {
			let status = user.status;
			return Users.update({ status: !status }, { where: { id : id } });
		})
		.then((data) => {
			return Users.findOne({ where: { id : id } });
		})
		.then((data) => {
			return res.status(200).json({ success: true, message: 'Succesfully Changed User Status', user: data }).end();
		})
		.catch(function(error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
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
function validateUpdateUserPasswordFormBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your current password';
  }

  if (!payload || typeof payload.newPassword !== 'string' || payload.newPassword.trim().length === 0 || payload.newPassword.trim().length < 6) {
    isFormValid = false;
    errors.newPassword = 'Please provide your new password';
		if (payload.newPassword.trim().length < 6) {
			errors.newPassword = 'Must be atleast 6 characters.';
		}
  }

  if (!payload || typeof payload.newPasswordRepeat !== 'string' || payload.newPasswordRepeat.trim().length === 0 || payload.newPasswordRepeat.trim().length < 6) {
    isFormValid = false;
		errors.newPasswordRepeat = 'Please provide your new password again.';
		let len = payload.newPasswordRepeat.trim().length;
		if (len < 6) {
			errors.newPasswordRepeat = 'Must be atleast 6 characters.';
		}
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
