/**
 * Created by Trevor on 2/18/2017.
 */
// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/customer', function(req,res) {

        res.render('customer.ejs');
    });

    app.get('/logo', function(req,res) {

        res.render('/public/images/logo.png');
    });

    app.get('/drivers', function(req,res) {

        res.render('drivers.ejs');
    });

    app.get('/cities', function(req,res) {

        res.render('cities.ejs');
    });

    app.get('/about', function(req,res) {

        res.render('about.ejs');
    });

    app.get('/package_pool', function(req,res) {
        res.render('package_pool.ejs');
    });
    app.get('/listPackages',function(req,res){
        var data = require('./views/testData.json');
        res.render('listPackages.ejs',{data:data});
    });
    app.get('/active',function(req, res){
        res.render('active.ejs', req.package);
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/packages', function(req,res){
        res.render('package_pool.ejs', {
            packages: req.packages
        });
    });
    app.get('/sendPackage', function(req,res){
        res.render('sendPackage.ejs');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
   // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/packages', passport.authenticate('package-post', {
        successRedirect: '/package_pool',
        failureRedirect: '/profile',
        failureFlash: true
    }));

// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages

    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// app/routes.js



