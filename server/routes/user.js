var express  = require('express');
var router = express.Router();

var userFunc = require('../controllers/user');


// @endpoint api/user/:id
// Get a user by id
router.get('/:id', userFunc.getUser);

module.exports = router;
