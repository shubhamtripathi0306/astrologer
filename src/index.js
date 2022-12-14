const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const payment = require("./routes/payment")
const multer = require('multer');
const aws = require("aws-sdk")
const app = express();
require("dotenv").config()
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


mongoose.connect("mongodb+srv://aniketflyweis:Flyweis@student.8yymmsy.mongodb.net/ShravanAPI?authSource=admin&replicaSet=atlas-v1orbd-shard-0&readPreference=primary&appname=E-wallet%20Compass&ssl=true", { useNewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))



app.use('/', route);
 app.use("/pay",payment)


app.listen(process.env.PORT || 5000, function () {
    console.log("Express app in running on PORT " + (process.env.PORT || 5000))
});