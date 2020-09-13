const express = require("express"),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cats', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

//OR

// mongoose.connect('mongodb://localhost:27017/cats', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, function (err) {
//     if (err) {
//         console.log("Mongo Error" + err);
//     }
//     else {
//         console.log("Connected to DB!");
//     }
// })




const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperment: String
});

let Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;

// // METHOD 1 using Model Class and save()
// let cat = new Cat({
//     name: "Gucci",
//     age: 9,
//     temperment: "Tricky"
// });
// // check using callback
// cat.save(function (err, res) {
//     if (err) { console.log(err) }
//     else {
//         console.log(res)
//     }
// });
// // check usins promise
// cat.save()
//     .then((res) => { console.log(res) })
//     .catch(err => { console.log(err); })




// // METHOD 2 using Cat schema and create()
// // saves one or more cats
// // -- calls save() on for every document(cat)

// // check using promise
// Cat.create([
//     {
//         name: "hobo",
//         age: 3,
//         temperment: "happy"
//     },
// ]).then((cat) => { console.log(cat) })
//     .catch(err => { console.log(err); })
// // check using callback
// Cat.create([
//     {
//         name: "hobo",
//         age: 3,
//         temperment: "happy"
//     },
// ], function (err, res) {
//     console.log(res);
// });

Cat.find(function (err, res) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(res);
    }
})

// //works but find() returns mongoose.Query which are also thenable and can use promise syntax
// Cat.find({}).then(res => { console.log(res); })


