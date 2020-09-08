const express= require('express');
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.send("<h1>Welcome using send</h1>")
});

app.get("/home",(req,res)=>{
    res.render("home")
});

app.get("/fallinlove/:thing", (req,res)=>{
    var thing = req.params.thing;
    res.render("love",{thingVar:thing})
});

app.get("/posts",(req,res)=>{
    var posts=[
        {title:"i love cats", author:"avani"},
        {title:"cats are the best" , author:"amisha"},
        {title:"i think dragons are neat", author:"tohru"}

    ]
    res.render("posts", {posts})//same as posts:posts
});

app.listen(process.env.PORT||3000,function(){
    console.log("Server has started");
})