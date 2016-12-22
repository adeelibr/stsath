var express = require('express');
var router = express.Router();

// middlewares
var isAuth = require('../../middlewares/isAuth');

// api's
var user = require('./user');

router.use('/user', isAuth, user);

module.exports = router;
