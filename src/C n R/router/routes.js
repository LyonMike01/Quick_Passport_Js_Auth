const express = require("express");
const passport = require('passport');
const {User} = require("../../model/User");

const router = express.Router();

// show sign up form
router.get("/register", (req, res) => {
	res.render("register");
});

// Register a new user

router.post("/register", (req, res, next) => {

        User.register({ username: req.body.email }, req.body.password,  (err, user) => {
            if (err) {
                return res.render("home");
            }
            // go to the next middleware
            next();
    
        });
    }, passport.authenticate("local", { 
        successRedirect: "/secrets",
        failureRedirect: "/home" 
    }));

                
// show login form
router.get("/login", (req, res) => {
	res.render("login");
});

// login an existing user
router.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		if (err) {
                        console.log(err.mesage)
			return next(err);
		}

		if (!user) {
			return res.redirect("/login");
		}

		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}

			return res.redirect("/secrets");
		});
	})(req, res, next);
});

// Logout User
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/login");
});

router.get("/secrets", function(req, res){
        if (req.isAuthenticated()) {
                res.render("secrets");
        } else {
                res.redirect("/login")
        }
});


/* GET secret Page */
router.get("/home", function(req, res){
        res.render("home");
});


module.exports = router;
