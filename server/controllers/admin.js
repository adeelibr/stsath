const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var models = require('../models');
var Admins = models.admins;

module.exports = {
  signup: function (req, res, next) {
    const validateResult = validateSignupBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    let admin = {
			username: req.body.username,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			hashed_password: bcrypt.hashSync(req.body.password),
		};

    Admins.findAll({
      where: {
        username: admin.username
      }
    })
    .then((data) => {
      if (data.length > 0) {
        let errors = {};
        let message = 'Check form for errors';
        errors.username = 'Username Already Exists';
        return res.status(400).json({ success: false, message: message, errors: errors }).end();
      } else {
        return Admins.create(admin)
      }
    })
		.then((data) => {
      if (!data) {
				res.status(400).send({ success: false, message: 'User was not created.' });
			} else if (data) {
        return res.status(200).json({ success: true, message: 'Succesfully created account', admin: data }).end();
      }
		})
    .catch((err) => {
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
  },
  login: function (req, res, next) {
    const validateResult = validateLoginFormBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    let body = {
      username: req.body.username,
      password: req.body.password,
    };

		Admins.findOne({ where: { username: body.username } })
		.then(function(user) {
			if (!user) {
				res.status(400).send({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
        if (!bcrypt.compareSync(body.password, user.hashed_password)) {
					res.status(400).json({ success: false, message: 'Authentication failed. Wrong Password.' });
				} else {
					var payload = { user };
					var token = jwt.sign(payload, req.app.get('superSecret'), {
						expiresIn: '72h' // expires in 24 hours
					});
					res.status(200).json({ success: true, message: 'Enjoy Your Token.', token: token });
				}
			}
		})
    .catch(function(error) {
			return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
		})
  },
}

function validateSignupBody(payload) {
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
