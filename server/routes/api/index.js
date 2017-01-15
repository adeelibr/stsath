var express = require('express');
var router = express.Router();

// middlewares
var isAuth = require('../../middlewares/isAuth');

// api's
var common = require('../../controllers/common'); // public routes without authentication
var user = require('./user');
var search = require('./search');
var feedback = require('./feedback');
var admin = require('./admin');

router.get('/', function(req, res) {
  res.status(200).json({ message: 'Welcome to the coolest API on earth!' });
})


router
  .post('/login', common.login)
  .post('/signup', common.signup)
  .post('/contact', common.contact)
  .use('/user', isAuth, user)
  .use('/search', isAuth, search)
  .use('/feedback', isAuth, feedback)
  .use('/admin', admin);

module.exports = router;
