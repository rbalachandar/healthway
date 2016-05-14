var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

    // route middleware that will happen on every request
    router.use(function(req, res, next) {
    console.log("Path: " + __dirname);
    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
    });
    
	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		//res.render('index', { message: req.flash('message') });
        res.sendfile('index.html');
        console.log("Path: " + __dirname);
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Loging Page */
	router.get('/signin', function(req, res){
//		res.render('register',{message: req.flash('message')});
        res.sendfile('./views/signin.html');
        console.log("Router Received signin GET");
	});

	/* GET Registration Page */
	router.get('/signup', function(req, res){
//		res.render('register',{message: req.flash('message')});
        res.sendfile('./views/signup.html');
        console.log("Router Received signup GET");
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));
    
//	router.post('/signup', function(req, res){
//        console.log("Router Received signup POST");
//	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		//res.render('home', { user: req.user });
        res.sendfile('./views/home.html');
        console.log("Router Received home GET");
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
