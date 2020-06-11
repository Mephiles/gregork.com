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

// AUTHENTICATION
router.get("/login", function(req, res){
    console.log("Loading LOGIN PAGE");
    res.render("login");
});

router.post('/login', function(req, res) {
    console.log("Loading LOGIN PAGE");
    passport.authenticate('local', function(err, user, info) {
        if(!user) {
            // FLASH
            req.flash("error", "Incorrect username or password!");
            res.redirect("/login");
        } else {
            req.logIn(user, function(err){
                req.flash("success", "Welcome back!");
                res.redirect("/home");
            });
        }
    })(req, res);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// router.get("/register", function(req, res){
//     console.log("Loading REGISTER PAGE");
//     res.render("register", {info: req.query? req.query:undefined});
// });

// router.post("/register", async function(req, res){
//     const password1 = req.body.password1;
//     const password2 = req.body.password2;
//     const password = password1;
//     const isApiKeyCorrect = await apiKeyCorrect(req.body.apikey);

//     if(req.body.username === "" ||!req.body.username){
//         console.log("No username.")
//         req.flash("error", "Please enter a username!");
//         res.redirect(`/register?username=${req.body.username}&apikey=${req.body.apikey}`);

//     } else if(password1 !== password2){
//         console.log("Passwords do not match.")
//         req.flash("error", "Passwords do not match!")
//         res.redirect(`/register?username=${req.body.username}&apikey=${req.body.apikey}`);

//     } else if (req.body.apikey === "" || !req.body.apikey){
//         console.log("No api key.")
//         req.flash("error", "Please enter an apikey!")
//         res.redirect(`/register?username=${req.body.username}&apikey=${req.body.apikey}`);

//     } else if(isApiKeyCorrect !== true){
//         if(isApiKeyCorrect === false) {
//             console.log("Incorrect api key.")
//             req.flash("error", "Please enter a valid api key!")
//             res.redirect(`/register?username=${req.body.username}&apikey=${req.body.apikey}`);
//         } else {
//             console.log("Server error.")
//             req.flash("error", isApiKeyCorrect);
//             res.redirect(`/register?username=${req.body.username}&apikey=${req.body.apikey}`);
//         }
        

//     } else {
//         console.log("All good! Registering user.")
//         User.register(new User({
//                 username: req.body.username,
//                 apikey: req.body.apikey
//             }), req.body.password1, function(err, user){
//                 if (err) {
//                     req.flash("error", err.message);
//                     return res.redirect(`/register?username=${req.body.username}&apikey=${req.body.apikey}`);
//                 } else {
//                     req.login(user, async function(err){
//                         if(err){
//                             console.log("ERROR:", err);
//                         } else {
//                             var addUserInfo = require("../backgroundScripts/addUserInfo");
//                             console.log("ADDING USER INFO!");
//                             await addUserInfo(user, fetch);
//                             console.log("USER INFO ADDED!");
//                             req.flash("success", "Welcome!");
//                             return res.redirect('/home');
//                         }
//                     });
//                 }
//             }
//         );
//     }
// });

module.exports = router;