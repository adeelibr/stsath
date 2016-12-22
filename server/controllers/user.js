module.exports = {

	getUser: function (req, res) {
		id = req.params.id;
		if (!id) {
			return res.status(400).send({ "error": "Parameter is missing" }).end();
		}

    return res.status(200).send({ "user": id }).end();
		// User.findOne({
		// 	where: { id : id }
		// })
		// .then(function(user) {
		// 	if(user === null) {
		// 		return res.status(400).send({"msg": "No User Found"}).end();
		// 	}
		// 	return res.status(200).send(user).end();
		// })
		// .catch(function(err) {
		// 	console.log(err);
		// 	return res.status(500).send({"msg": "Internal Server Error"}).end();
		// })
	}, // end of getUser

}
