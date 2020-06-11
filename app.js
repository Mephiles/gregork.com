console.log("SERVER START");

// ==========================================
// SETTINGS
// ==========================================

const serverPORT = 8088;
console.log(`Server PORT: ${serverPORT}`);

// ==========================================
// SETUP
// ==========================================

console.log("Setup..");

// LIBRARIES
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');

// MODELS & SCRIPTS

// MIDDLEWARE
app.use(favicon('./public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/media", express.static("media"));

// ==========================================
// DATABASE
// ==========================================

// ==========================================
// PASSPORT
// ==========================================

// ==========================================
// LOGIC
// ==========================================

// ==========================================
// ROUTES
// ==========================================

console.log(`Linking route files..`);
try{
	var sitesRoutes = require("./routes/sites");

	app.use(sitesRoutes);

	app.get("*", function(req, res){
	    res.render("notfound");
	});
} catch(err){
	logError(err);
}

// ==========================================
// SERVER LISTENING
// ==========================================

console.log(`INITIALIZING SERVER`);
try{
	app.listen(serverPORT, function(){
	    console.log(`Listening on port ${serverPORT}`);
	});
} catch(err){
	logError(err);
}

// ==========================================
// TESTING
// ==========================================

// ==========================================
// FUNCTIONS
// ==========================================

function logError(err){
	console.log(`Failed..`);
	console.log("------------------------");
	console.log(err);
	console.log("------------------------");
}