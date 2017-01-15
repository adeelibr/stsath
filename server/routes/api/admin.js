var express  = require('express');
var router = express.Router();

var adminFunc = require('../../controllers/admin');

router
  .post('/signup', adminFunc.signup)
  .post('/login', adminFunc.login);

module.exports = router;
