require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/danceLightDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });