var isAuth = function(req, res, next) {
	var authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send({ "msg" : "Authorization headers are missing." }).end();
  }
	authHeader = authHeader.split(" ");
	var token = authHeader[1];

	req.user = token;
  next();

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
