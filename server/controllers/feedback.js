const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

var models = require('../models');
var Feedbacks = models.feedbacks;

module.exports = {
	addFeedback: function(req, res, next) {
		const validateResult = validateFeedbackFormBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

		let id = req.params.id;
		let feedback = req.body;
		feedback.user_id = id

		Feedbacks
			.create(feedback)
			.then((data) => {
				res.status(200).json({ success: true, message: 'Succesfully added feedback', data }).end();
			})
			.catch((error) => {
				return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
			})
	},
	getAllFeedbacks: function (req, res, next) {
		Feedbacks.findAll({
			where: req.query,
			include: [models.users]
		})
		.then((feedbacks) => {
			return res.status(200).json({ success: true, message: "List of All Feedbacks", feedbacks }).end();
		})
		.catch((error) => {
			return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
		});
	},
	deleteFeedbackById: function (req, res, next) {
		let id = req.params.id;
		Feedbacks.update({ visible: false }, {
			where: { id: id }
		})
		.then((data) => {
			return Feedbacks.findOne({ where: { id : id } });
		})
		.then((feedback) => {
			if (!feedback) {
				return res.status(400).json({ success: false, message: 'No Such Feedback Exists' }).end();
			}
			return res.status(200).json({ success: true, message: 'Succesfully updated feedback', feedback }).end();
		})
		.catch((error) => {
			return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
		})
	},
}

function validateFeedbackFormBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.person_name !== 'string' || payload.person_name.trim().length === 0) {
    isFormValid = false;
    errors.person_name = 'Please provide your name';
  }
  if (!payload || typeof payload.review !== 'string' || payload.review.trim().length === 0) {
    isFormValid = false;
    errors.review = 'Please provide your review';
	}
  if (!payload || typeof payload.rating !== 'number') {
    isFormValid = false;
    errors.rating = 'Please provide your rating';
	}
  if (!payload || typeof payload.siteUseful !== 'string' || payload.siteUseful.trim().length === 0) {
    isFormValid = false;
    errors.siteUseful = 'Please provide your siteUsefull';
  }
  if (!payload || typeof payload.siteDesign !== 'string' || payload.siteDesign.trim().length === 0) {
    isFormValid = false;
    errors.siteDesign = 'Please provide your siteDesign';
  }
  if (!payload || typeof payload.siteRecommend !== 'string' || payload.siteRecommend.trim().length === 0) {
    isFormValid = false;
    errors.siteRecommend = 'Please provide your siteRecommend';
  }
  if (!payload || typeof payload.competitors !== 'string') {
    isFormValid = false;
    errors.competitors = 'Please provide your any competitors';
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
