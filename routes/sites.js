var express = require("express");
var router = express.Router();
var passport = require('passport');

// ==========================================
// SETUP
// ==========================================

// Models
var User = require("../models/user");

// ==========================================
// ROUTES
// ==========================================

// SITES
router.get("/", function(req, res){
    console.log("Loading INDEX");
    res.render("index");
});

router.get("/education", function(req, res){
    console.log("Loading EDUCATION");
    res.render("education");
});

router.get("/projects", function(req, res){
    console.log("Loading PROJECTS");
    res.render("projects");
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