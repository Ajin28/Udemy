const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blog_demo2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to Associations!'))
    .catch(error => console.log(error.message));


//POST - title, content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Post = mongoose.model("Post", postSchema);

//USER - email ,name
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
            //ref tells mongoose which model to use during population
        }
    ]
});

let User = mongoose.model("User", userSchema);


// ------CREATING A USER
// User.create(
//     {
//         email: "bob@gmail.com",
//         name: "Bob the builder"
//     }
// );

// -------CREATING A POST
// Post.create(
//     {
//         title: "Broken Car",
//         content: "I can fix it"
//     }
// )

// ------CREATING A POST AND ADDING IT TO A USER (Only id)
// Post.create(
//     {
//         title: "Tinker bell",
//         content: "gold bell stonlen"
//     }, function (err, post) {
//         User.findOne({ email: "bob@gmail.com" }, function (err, foundUser) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function (err, data) {
//                     console.log(data)
//                 })
//             }
//         })
//     }
// )

// posts are ids
User.findOne({ email: "bob@gmail.com" }, function (err, user) {
    if (err)
        console.log()
    else {
        console.log(user);
    }
})

// posts are populated with documents returned from database
User.findOne({ email: "bob@gmail.com" }).populate("posts").exec(function (err, user) {
    if (err)
        console.log()
    else {
        console.log(user);
    }
})


