var express  = require('express');
var router = express.Router();

var feedbackFunc = require('../../controllers/feedback');

// @endpoint api/feedback/ Add Feedback
router.post('/user/:id', feedbackFunc.addFeedback);

module.exports = router;
