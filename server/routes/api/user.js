var express  = require('express');
var router = express.Router();

// middlewares
var isAuth = require('../../middlewares/isAuth');

var userFunc = require('../../controllers/user');

// @endpoint api/user/:id Get a user by id
router.get('/:id', isAuth, userFunc.getUser);

// @endpoint api/user/create
router.post('/create', userFunc.create);

// @endpoint api/user/:id Delete a user by id
router.delete('/:id', userFunc.delete);

module.exports = router;
