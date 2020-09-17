const express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user")

mongoose.connect('mongodb://localhost:27017/AuthDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    //this secret is used to encode and decode sessions. It can be anything.
    secret: "maow is awesome",
    resave: false,
    saveUninitialized: false
}));

//below two lines setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
//below method is responsible for encodind data and putting it back into seesion
passport.serializeUser(User.serializeUser());
//below method is responsible for reading the data from session that encoded and decoding it
passport.deserializeUser(User.deserializeUser());

//========ROUTES==============================
app.get("/", (req, res) => {
    res.render("home")
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret")
})

//CREATE REGISTER FORM
app.get("/register", (req, res) => {
    res.render("register");
})

//REGISTER USER
app.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.register(new User({ username: username }), password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        // passport.authenticate will actually log the user in 
        // will take care of everything in the session.
        // will store the correct information.
        // will run the serialized user method that we specified above.
        // then we're specifying that we want to use the local strategy.
        // In the future if we wanted to use another strategy and we had
        // it installed we could change that to be Twitter or Facebook.
        // Once user has looged in we're going to redirect to secret route
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret")
        })
    })

})

//CREATE LOGIN FORM
app.get("/login", (req, res) => {
    res.render("login");
});

//LOGIN USER
// middleware passport.authenticate is some code that 
// runs before our final route callback here.

// the idea is that they sit between the beginning of your 
// route and then at the end of the route which is our
// handler at the very end. Hence the name middleware.

// When our app gets a post request to slash log in 
// it's going to run this code immediately and we can
// have multiple middleware stacked up so we can have 
// another thing that will run after we authenticate
// and then another thing after that.
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {

})
// It's going to take the password and the user name that 
//are in the request inside request up body.

// We don't even have to explicitly provide that passport 
// automatically takes the username password from
// the form or from the request body and it's basically 
// going to compare the password that the user typed
// into the input and compare that to that crazy hash 
// version in the database.

//LOGOUT USER
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/")
});


// is logged in is a function we defined which acts as middleware
// we can define as many middleware as we want and they 
// all take these three parameters the request the response and the next function.
// next is actually the next thing that needs to be called.

// if things are fine if we want to move on to
// the next middleware we just call next.
// Just like to sceret page
// And in our case if things are not fine if the request is not authenticated that returns false then we
// short circuit and redirect to slash like it.

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login")

}

app.listen(3000, function () {
    console.log("AuthDemo Server started")
})