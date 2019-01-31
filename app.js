console.log("SERVER START");

// ==========================================
// SETTINGS
// ==========================================

const initialRun = false;

// ==========================================
// SETUP
// ==========================================

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require('connect-flash');
var expressSession = require("express-session");
// var fetch = require("node-fetch");


// Models & Scripts
var User = require("./models/user");
var log = require("./scripts/log.js");

// Middleware
	// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
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
app.use(function(req, res, next){
	const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
	const method = req.method;

	console.log("Connected IP -", ip);

	log(ip, method);

	next();
});
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    if(req.user){
        res.locals.user = user;
    } else {
        res.locals.user = req.user;
    }

    next();
});

// ==========================================
// DATABASE
// ==========================================

mongoose.connect("mongodb://localhost:27017/gregork", { useNewUrlParser: true });

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

var sitesRoutes = require("./routes/sites");
var authRoutes = require("./routes/auth");

app.use(sitesRoutes);
app.use(authRoutes);

app.get("*", function(req, res){
    res.render("notfound");
});

// ==========================================
// SERVER LISTENING
// ==========================================

const port = 8081;

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});

// ==========================================
// TESTING
// ==========================================