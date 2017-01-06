var express  = require('express');
var router = express.Router();

var userFunc = require('../../controllers/user');

// @endpoint api/user/:id Get a user by id
router.get('/:id', userFunc.getUser);

// @endpoint api/user/:id Update user info
router.post('/:id', userFunc.updateUserInfo);

// @endpoint api/user/passwordchange/:id Update user info
router.post('/passwordchange/:id', userFunc.updateUserPassword);

// @endpoint api/user/ Get all user
router.get('/', userFunc.getAllUser);

// @endpoint api/user/:id Delete a user by id
router.delete('/:id', userFunc.delete);

module.exports = router;
