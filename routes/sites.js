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

router.get("/projects/:name", function(req, res){
    console.log("Loading PROJECTS: ", req.params.name);
    res.render("projects/"+req.params.name)
});

router.get("/skills", function(req, res){
    console.log("Loading SKILLS");
    res.render("skills");
});

module.exports = router;