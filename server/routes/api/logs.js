var express  = require('express');
var router = express.Router();

var logsFunc = require('../../controllers/logs');

router.get('/', logsFunc.getAllLogs);

module.exports = router;
