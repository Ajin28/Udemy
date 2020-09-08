const express= require('express');
const app = express();
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.send("<h1>Welcome using send</h1>")
});

app.get("/home",(req,res)=>{
    res.render("home.ejs")
});

app.get("/fallinlove/:thing", (req,res)=>{
    var thing = req.params.thing;
    res.render("love.ejs",{thingVar:thing})
});

app.get("/posts",(req,res)=>{
    var posts=[
        {title:"i love cats", author:"avani"},
        {title:"cats are the best" , author:"amisha"},
        {title:"i think dragons are neat", author:"tohru"}

    ]
    res.render("posts.ejs", {posts})//same as posts:posts
});

app.listen(process.env.PORT||3000,function(){
    console.log("Server has started");
})