console.log("SERVER START");

// ==========================================
// SETTINGS
// ==========================================

// --------- FILE RUN ARGUMENTS ----------------
var minimist = require('minimist')

var args = minimist(process.argv.slice(2), {
  boolean: 'development',
  alias: {d: 'development', dev: 'development'},
  default: {
  	development: false
  }
})
// --------- FILE RUN ARGUMENTS ----------------

const DEVELOPMENT = args.development;

console.log(`Mode: ${DEVELOPMENT? "DEVELOPMENT":"RELEASE"}`);

const initialRun = false;
const connectionLimit = 100;

const serverPORT = DEVELOPMENT? 8080:8081;
const databasePORT = DEVELOPMENT? 27017:27002;

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
// var fetch = require("node-fetch");


// MODELS & SCRIPTS
var User = require("./models/user");
var log = require("./scripts/log.js");
var Ip = require("./models/ip");

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
// app.use(function(req, res, next){
// 	const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
// 	const method = req.method;

// 	console.log("Connected IP -", ip);
// 	log(ip, method);
// 	next();
// });
// app.use(function(req, res, next){
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
    
//     if(req.user){
//         res.locals.user = user;
//     } else {
//         res.locals.user = req.user;
//     }

//     next();
// });
// app.use(function(req, res, next){
// 	const _ip = req.headers["x-real-ip"] || req.connection.remoteAddress;

// 	Ip.findOne({ip:_ip}, function(err, ip){
// 		if(err)
// 			console.log("ERROR", err);

// 		if(ip){
// 			if(ip.blocked === true){
// 				return res.status(401).send({code: 1, msg: "IP blocked"});
// 			}
// 			if(ip.connections >= connectionLimit){
// 				ip.blocked = true;
// 				ip.date = new Date();
// 				ip.save();
// 				return res.status(401).send({code: 1, msg: "Sorry, You have reached the request limit. Your IP will be unblocked in 3 minutes"});
// 			}

// 			ip.connections = ip.connections + 1;
// 			ip.blocked = false;
// 			ip.date = new Date();
// 			ip.log.push({
// 				date: new Date(),
// 				request: req.originalUrl,
// 				method: req.method
// 			});
// 			ip.save();
// 			next();
// 		} else {
// 			let curDate = new Date();
// 			Ip.create({
// 				ip: _ip,
// 				connections: 1,
// 				blocked: false,
// 				date: curDate,
// 				log: [{
// 					date: curDate,
// 					request: req.originalUrl,
// 					method: req.method
// 				}]
// 			}, function(err, ip){
// 				if(err){
// 					console.log("ERROR", err);
// 					return res.result(500).send(err);
// 				}
// 			});
// 		}
// 	});
// });

// ==========================================
// DATABASE
// ==========================================

console.log(`Linking database..`);
try{
	mongoose.connect(`mongodb://localhost:${databasePORT}/gregork`, { useNewUrlParser: true });
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

// User.findOne({username: "gregor"}, function(err, user){
// 	if(err)
// 		console.log("ERROR", err);

// 	if(!user)
// 		User.create({
// 			username: "gregor",
// 			name: {
// 			    first: "Gregor",
// 			    middle: "",
// 			    last: "Kaljulaid"
// 			},
// 			password: "test",
// 			birthDate: {
// 				year: 2001,
// 				month: 4,
// 				day: 5
// 			},
// 			gender: "Male",
// 			contact: {
// 			    phone: "+372 565 5723",
// 			    email: "gregor.kaljulaid@gmail.com",
// 			    address: {
// 			        country: "Estonia",
// 			        state: "Raplamaa",
// 			        city: "Märjamaa",
// 			        street: "",
// 			        house: "",
// 			        appartment: ""
// 			    }
// 			},
// 			last_edited: new Date()
// 		}, function(err, user){
// 			if(err)
// 				console.log("ERROR", err);
// 			else
// 				console.log("USER CREATED");
// 		});
// });

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