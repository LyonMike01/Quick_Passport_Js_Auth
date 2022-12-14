var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect("/login");
}

module.exports = function(passport){

	// /* GET login page. */
	// router.get("/", function(req, res) {
    // 	// Display the Login page with any flash message, if any
	// 	res.render("home");
	// });

	/* Handle Login POST */
	router.post("/login", passport.authenticate("login", {
		successRedirect: "/secrets",
		failureRedirect: "/home",
	}));

	/* GET Registration Page */
	router.get("/register", function(req, res){
		res.render("register");
	});

	/* Handle Registration POST */
	router.post("/register", passport.authenticate("signup", {
		successRedirect: "/secrets",
		failureRedirect: "/home",
	}));

	/* GET secret Page */
	router.get("/secrets", isAuthenticated, function(req, res){
		res.render("secrets");
	});


	/* GET secret Page */
	router.get("/home", function(req, res){
		res.render("home");
	});

	/* Handle Logout */
	router.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/home");
	});

	return router;
}





