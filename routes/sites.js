var express = require("express");
var router = express.Router();
var passport = require('passport');

// ==========================================
// SETUP
// ==========================================

// Models
const User = require("../models/user");
const Log = require("../models/log");

// ==========================================
// ROUTES
// ==========================================

router.get("/", function(req, res){
    console.log("Loading INDEX");
    res.render("index", {site: "home"});
});

router.get("/education", function(req, res){
    console.log("Loading EDUCATION");
    res.render("education", {site: "education"});
});

router.get("/projects", function(req, res){
    console.log("Loading PROJECTS");
    res.render("projects", {site: "projects"});
});

router.get("/logs", function(req, res){
    console.log("Loading LOGS");

    Log.find({}, function(err, data){
        if(err){
            console.log("ERROR", err);
            req.flash("error", err.message);
            return res.redirect("/");
        }
        
        res.render("logs", {data: data});
    });
});

// FUNCTIONS
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("User not logged in: redirecting.")
    req.flash("error", "Please log in!")
    res.redirect("/login");
}

module.exports = router;