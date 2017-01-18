var express  = require('express');
var router = express.Router();

var userFunc = require('../../controllers/user');

// @endpoint api/user/:id Get a user by id
router.get('/:id', userFunc.getUser);

// @endpoint api/user/:id Update user info
router.post('/:id', userFunc.updateUserInfo);

// @endpoint api/user/:id/passwordchange Update user info
router.post('/:id/passwordchange', userFunc.updateUserPassword);

// @endpoint api/user/ Get all user
router.get('/', userFunc.getAllUser);

// @endpoint api/user/status/:id Update User Status
router.put('/status/:id', userFunc.statusUpdate);

module.exports = router;
