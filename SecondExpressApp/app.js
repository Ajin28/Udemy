const express= require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("Hi there. welcome to my assignment!");
});

app.get("/speaks/:animal",(req,res)=>{
    switch(req.params.animal)
    {
        case "cow": res.send("The cow says Moo");
        break;
        case "dog":res.send("The dog says Woof");
        break;
        case "cat":res.send("The cat says Meowww");
        break;
        case "pig":res.send("The pig says Oink");
        break;
        default :
        res.send("I don't know what "+req.params.animal+" says.");

    }
});


app.get("/repeat/:word/:num",(req,res)=>{
    let word= req.params.word;
    let num= Number( req.params.num);
    let string="";
    for(var i=0; i<num-1;i++){
        string=string+word+" ";
    }
    string=string+word;
    res.send(string);

});

app.get("*",(req,res)=>{
    res.send("Page Not Found")
})

app.listen(3000,function(){
    console.log("Server has Started")
})