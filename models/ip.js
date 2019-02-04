var mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
	ip: String,
	blocked: {type:Boolean, default: false},
	connections: {type:Number, default: 0},
	log: [
		{
			_id: false,
			date: Date,
			request: String,
			method: String
		}
	],
	date: Date
});

module.exports = mongoose.model("ip", ipSchema);
