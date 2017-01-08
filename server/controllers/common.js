const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
const nodemailer = require("nodemailer");
const moment = require('moment');

const config = require('../../config');

var models = require('../models');
var Users = models.users;

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

		Users.findOne({ where: { username: username } })
		.then(function(user) {
			if (!user) {
				res.status(400).send({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {
        if (!bcrypt.compareSync(req.body.password, user.hashed_password)) {
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
    Users.findAll({
      where: {
        username: user.username
      }
    })
    .then((data) => {
      if (data.length > 0) {
        let errors = {};
        errors.username = 'Username Already Exists';
        let message = 'Check form for errors';
        return res.status(400).json({ success: false, message: message, errors: errors }).end();
      } else {
        return Users.create(user)
      }
    })
		.then((data) => {
      if (!data) {
				res.status(400).send({ success: false, message: 'User was not created.' });
			} else if (data) {
        return res.status(200).json({ success: true, message: 'Succesfully created account', user: data }).end();
      }
		})
    .catch((err) => {
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})

	},

  contact: function (req, res, next) {
    const validateResult = validateContactForm(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    let person_name = req.body.person_name;
    let email = req.body.email;
    let message = req.body.message;
    let createdAtDate = moment().format('MMMM Do YYYY, h:mm:ss a');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(config.emailConnection);
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"STSATH 👥" <stsathdemo@gmail.com>', // sender address
        to: `adeelimranr@gmail.com, ${email}`, // list of receivers
        subject: 'Get In Touch', // Subject line
        html: `
            <p>
              Dear ${person_name}, thanks for getting in touch with STSATH team. One of our
              representative will get in touch with you shortly.
            </p>
            <p>
              Email Details (Copy)<br/>
              Name: ${person_name}<br/>
              Email: ${email}<br/>
              Message: ${message}<br/>
              Message Sent At: ${createdAtDate}<br/>

              <br/><br/><br/>

              With Love,
              The <a href="http://localhost:3000/">STSATH</a> Team<br/>
            </p>

            <script type="application/ld+json">
              {
                "@context": "http://schema.org",
                "@type": "EmailMessage",
                "potentialAction": {
                  "@type": "ViewAction",
                  "url": "https://google.com",
                  "name": "Go to Google"
                },
                "description": "Search for something from Google"
              }
            </script>`
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return res.status(500).json({ success: false, message: 'Internal Server Issue', errors: error }).end();
        }
        res.status(200).send({ success: true, message: 'Message Sent Succedfully' });
    });
  },

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
function validateContactForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.person_name !== 'string' || payload.person_name.trim().length === 0) {
    isFormValid = false;
    errors.person_name = 'Name field is required';
  }
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email address';
  }
  if (!payload || typeof payload.message !== 'string' || payload.message.trim().length === 0) {
    isFormValid = false;
    errors.message = 'Message field is required';
  }

  if (!isFormValid) {
    message= 'Check the form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}
