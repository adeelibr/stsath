var jwt    = require('jsonwebtoken');

var models = require('../models');
var users = models.users;

var isAuth = function(req, res, next) {

	var authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ success: false, message: "Authorization headers are missing." }).end();
  }
	authHeader = authHeader.split(" ");
	var token = authHeader[1];

	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.status(400).json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
			}
		});
	}

  // User
  // .findOne({ where : { token : token}})
	// .then(function(user) {
	// 	if(!user)
	// 		return res.status(401).send({msg : "Invalid token."}).end();
	// 	else{
	// 		req.user = user;
	// 		next();
	// 	}
	// })
}

module.exports = isAuth;
