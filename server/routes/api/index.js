var express = require('express');
var router = express.Router();

// middlewares
var isAuth = require('../../middlewares/isAuth');

// api's
var common = require('../../controllers/common');
var user = require('./user');

router.get('/', function(req, res) {
  res.status(200).json({ message: 'Welcome to the coolest API on earth!' });
})


router
  .post('/login', common.login) // public routes without authentication
  .use('/user', isAuth, user);

module.exports = router;
