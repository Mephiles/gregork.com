console.log("SERVER START");

// ==========================================
// SETTINGS
// ==========================================

const serverPORT = 8080;
const databasePORT = 27017;

console.log(`Server PORT: ${serverPORT}`);
console.log(`Database PORT: ${databasePORT}`);

// ==========================================
// SETUP
// ==========================================

console.log("Setup..");

// LIBRARIES
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require('connect-flash');
var expressSession = require("express-session");
var favicon = require('serve-favicon');


// MODELS & SCRIPTS
var User = require("./models/user");

// MIDDLEWARE
app.use(favicon('./public/favicon.ico'));
app.use(expressSession({
    secret: "Please, don't hurT me :)",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/media", express.static("media"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ==========================================
// DATABASE
// ==========================================

console.log(`Linking database..`);
try{
	mongoose.connect(`mongodb://localhost:${databasePORT}/gregork`, { useNewUrlParser: true});
} catch(err){
	logError(err);
}

// ==========================================
// PASSPORT
// ==========================================

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========================================
// LOGIC
// ==========================================

// ==========================================
// ROUTES
// ==========================================

console.log(`Linking route files..`);
try{
	var sitesRoutes = require("./routes/sites");
	var authRoutes = require("./routes/auth");

	app.use(sitesRoutes);
	app.use(authRoutes);

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