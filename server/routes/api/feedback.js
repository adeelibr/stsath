var express  = require('express');
var router = express.Router();

var feedbackFunc = require('../../controllers/feedback');

// @endpoint api/feedback/user/:id Add Feedback
router.post('/user/:id', feedbackFunc.addFeedback);

// @endpoint api/feedback/ Get All Feedbacks
router.get('/', feedbackFunc.getAllFeedbacks)

module.exports = router;
