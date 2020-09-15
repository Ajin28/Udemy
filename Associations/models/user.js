const mongoose = require("mongoose");

//USER - email ,name
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

module.exports = mongoose.model("User", userSchema);
