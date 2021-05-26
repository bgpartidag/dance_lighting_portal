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

const danceSchema = {
    choreographer: String,
    length: String,
    comments: String,
    cues: [{
        start_time: Number,
        end_time: Number,
        lights: [{light_name: String, color: String, brightness: String}]
    }]
}

const Dance = mongoose.model('Dance', danceSchema);

const showSchema = {
    team_username: {
        type: String,
        required: true
    },
    show_name:{
        type: String,
        require: [true, "Show must be named"]
    },
    contact_name:{
        type:String,
        require: [true, "Contact Name cannot be empty"]
    },
    contact_email:{
        type:String,
        require: [true, "Contact String cannot be empty"]
    },
    contact_phone:{
        type:String,
        require: [true, "Contact  cannot be empty"]
    },
    show_dates: [{
        type: String,
        validate: {
            validator: function (value) {
                return /\d{2}-\d{2}-\d{4}/.test(value)
            },
            message: "Date format must be mm-dd-yyyy"
        }
    }],
    tech_dates: [{
        type: String,
        validate: {
            validator: function (value) {
                return /\d{2}-\d{2}-\d{4}/.test(value)
            },
            message: "Date format must be mm-dd-yyyy"
        }
    }],
    dances: [
        {dance_id: Number }
    ]
}

const Show = mongoose.model('Show', showSchema);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        require: true

    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
    team_type: {
        type: String,
        require: true,
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

//Configure passport
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3001, function () {
    console.log("server started at 3001");
});

app.get('/node_get_show_by_id', function (req, res) {
    Show.findOne({"_id": req.query.show_id}, function (err, data) {
        if (err || data.length === 0) {
            res.send({
                "message": "internal database error",
                "data": {}
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get('/node_get_dance_by_id', function (req, res) {
    Dance.findOne({"_id": req.query.dance_id}, function (err, data) {
        if (err || data.length === 0) {
            res.send({
                "message": "internal database error",
                "data": {}
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});