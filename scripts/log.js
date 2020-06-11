function log(ip, method){
	const date = new Date();
	const Log = require("../models/log");

	Log.create({
		type: method,
		date: date,
		ip: ip
	}, function(err, log){
		if(err)
			console.log("ERROR", err);
	});
}

module.exports = log;