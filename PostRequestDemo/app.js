const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var friends = ["Ayushi", "Avani", "Bhagya", "Anu", "Cersei"]

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/friends", (req, res) => {
    res.render("friends", { friends });
});

app.post("/addfriend", function (req, res) {
    let newfriend = req.body.newfriend;
    friends.push(newfriend)
    res.redirect("/friends");
    //redirect will redirect to given route and run the code of get /friend route
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started");
});