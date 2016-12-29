var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

var models = require('../models');
var users = models.users;

function validateLoginFormBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password';
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

function validateSignupFormBody(payload) {
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

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your Password';
  }

  if (!payload || typeof payload.confirmPassword !== 'string' || payload.password.trim().length === 0 || !validator.equals(payload.password, payload.confirmPassword)) {
    isFormValid = false;
    errors.confirmPassword = 'Password & Confirm Password Do Not Match';
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

module.exports = {

  login: function (req, res, next) {
		var username = req.body.username;
		var password = req.body.password;

    const validateResult = validateLoginFormBody(req.body); // { username, password}

    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

		users.findOne({ where: { username: username } })
		.then(function(user) {
			if (!user) {
				res.status(400).send({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
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
    .catch(function(err) {
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
	},

  signup: function (req, res, next) {

    const validateResult = validateSignupFormBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    var user = {
			username: req.body.username,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			hashed_password: bcrypt.hashSync(req.body.password),
		};

		users.create(user)
		.then(function(user) {
      if (!user) {
				res.status(400).send({ success: false, message: 'User was not created.' });
			} else if (user) {
        return res.status(200).json({ success: true, message: 'Succesfully created account', user: user }).end();
      }
		})
    .catch(function(err) {
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})

	}

}
