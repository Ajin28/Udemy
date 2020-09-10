const axios = require("axios")
var data2;
var data3;

var data1 = axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(res => { console.log(res.data) })
    .catch(err => { console.log(err) });

(async () => {
    try {
        data2 = await axios.get("https://jsonplaceholder.typicode.com/users/2");
        console.log(data2.data);
    } catch (error) {
        console.log(error);
    }

})();


(async function () {
    try {
        data3 = await axios.get("https://jsonplaceholder.typicode.com/users/3");
        console.log(data3.data);
    } catch (error) {
        console.log(error)
    }

})();

console.log(data1, data2, data3);