const express = require('express');
const mongoose = require("mongoose");
const infoRouter = require("./routes/infoRoutes.js");
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

const username = "mern";
const password = "mongodb";

mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.or6kn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error : "));
db.once("open",function(){
    console.log("Connected successfully");
})

app.use(infoRouter);


app.listen(3000,() => {
    console.log("Server is running at port 3000");
})

