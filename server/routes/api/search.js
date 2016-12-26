var express = require('express');
var router = express.Router();

var searchFunc = require('../../controllers/search');

// @endpoint api/search/choice
router.get('/choice', searchFunc.choice);

module.exports = router;
