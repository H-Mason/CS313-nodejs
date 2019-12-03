function login(req, res) {

	var result = {success: false};

	if (req.body.username == "admin" && req.body.password == "password") {
		req.session.user = req.body.username;
		result = {success: true};
	}

	res.json(result);
}

function logout(req, res) {
	var result = {success: false};

	if (req.session.user) {
		req.session.destroy();
		result = {success: true};
	}

	res.json(result);
}

function getServerTime(req, res) {
	var time = new Date();
	
	var result = {success: true, time: time};
	res.json(result); 
}
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	next();
}

module.exports = {login: login, logout: logout, getServerTime: getServerTime, verifyLogin: verifyLogin, logRequest: logRequest};