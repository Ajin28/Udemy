console.log("Hello from app.js");

const express = require("express");
const app = express();

// "/" => "Hi there!"
app.get("/",function (req,res){
    res.send("Hi there");
});

// "/bye" => "Goodbye"
app.get("/bye",function (req,res){
    res.send("Goodbye!");
});

// "/dog" => "Woof!"
app.get("/dog",function (req,res){
    res.send("Woof!");
});

app.get("/dog/:dogName",(req,res)=>{
    res.send(req.params);
})
app.get("*", function(req,res){
    res.send("Star!!");
});

//tells express to listen for requests (starts server)
app.listen(3000,function(){
    console.log("Server has Started")
})