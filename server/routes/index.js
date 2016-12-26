var express = require('express');
var router = express.Router();

var api = require('./api');


router.use('/api', api);
router.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'server/static', 'index.html'))
})

module.exports = router;
