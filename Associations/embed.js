const mongoose = require("mongoose");
const Post = require("./models/post"),
    User = require("./models/user")

mongoose.connect('mongodb://localhost:27017/blog_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to Associations!'))
    .catch(error => console.log(error.message));

// User.create(
//     {
//         email: "Tohru@brow.com",
//         name: "Tohru",
//         posts: [
//             {
//                 title: "Dragon Maid",
//                 content: "Dragons are awesome"
//             }

//         ]
//     }, function (err, user) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(user)
//         }
//     }
// )

// Post.create({
//     title: "Liked Kedi",
//     content: "Awesome movie"
// }, function (err, post) {
//     if (err)
//         console.log(err)
//     else
//         console.log(post)
// })

// User.findOne({ name: "Tohru" }, function (err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         user.posts.push({
//             title: "Cooking",
//             content: "I love cooking"
//         });
//         //adds to database
//         user.save(function (err, userPost) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(userPost);
//             }
//         })
//     }
// })