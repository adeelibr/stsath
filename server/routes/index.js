var express = require('express');
var router = express.Router();

var user = require('./user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'STSATH' });
});

router.use('/user', user);

module.exports = router;
