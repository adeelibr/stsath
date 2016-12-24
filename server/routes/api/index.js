var express = require('express');
var router = express.Router();

// middlewares
var isAuth = require('../../middlewares/isAuth');

// api's
var common = require('../../controllers/common'); // public routes without authentication
var user = require('./user');

router.get('/', function(req, res) {
  res.status(200).json({ message: 'Welcome to the coolest API on earth!' });
})


router.post('/login', common.login);
router.post('/signup', common.signup);
router.use('/user', isAuth, user);

module.exports = router;
