const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//adds a bunch of methods that come with passport-local-mongoose package
//to userSchema like serializeUser() , deserializeUser()
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)