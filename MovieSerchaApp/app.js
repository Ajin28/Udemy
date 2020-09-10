const axios = require('axios');
const express = require('express');
const app = express();

app.set("view engine", "ejs")

app.get("/results", (req, res) => {
    let query = req.query.search;
    console.log(req.query)
    let url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;
    axios.get(url)
        .then(response => {
            res.render("results", { data: response.data });
        })
        .catch(err => {
            console.log(err);
        })
});

app.get("/", (req, res) => {
    res.render("search");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Movie app har started");
});

//post : req.body.paramName
//get  :req.query.paramName