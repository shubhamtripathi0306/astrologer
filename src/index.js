const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const multer = require('multer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(multer().any());

mongoose.connect("mongodb+srv://aniketflyweis:Flyweis@student.8yymmsy.mongodb.net/ShravanAPI?authSource=admin&replicaSet=atlas-v1orbd-shard-0&readPreference=primary&appname=E-wallet%20Compass&ssl=true", { useNewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 5000, function () {
    console.log("Express app in running on PORT " + (process.env.PORT || 5000))
});