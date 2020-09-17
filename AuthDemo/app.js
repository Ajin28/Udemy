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

//below method is responsible for encodind data and putting it back into seesion
passport.serializeUser(User.serializeUser());
//below method is responsible for reading the data from session that encoded and decoding it
passport.deserializeUser(User.deserializeUser());

//========ROUTES==============================
app.get("/", (req, res) => {
    res.render("home")
})

app.get("/secret", (req, res) => {
    res.render("secret")
})

//CREATE USER
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

app.listen(3000, function () {
    console.log("AuthDemo Server started")
})