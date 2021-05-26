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

// Requirements for a show
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

// Requirements for a user
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

// Server location at 3001
app.listen(3001, function () {
    console.log("server started at 3001");
});

// Register a User
app.get('/node_register', (req, res) => {
    if (req.query.error) {
        // ERROR
        // res.redirect("/register.html?error=" + req.query.error);
    } else {
        // ERROR
        // res.redirect("/register.html");
    }
});

// Login a User
app.get('/node_login', (req, res) => {
    if (req.query.error) {
        // ERROR
        // res.redirect("/login.html?error=" + req.query.error);
    } else {
        // ERROR
        // res.redirect("/login.html");
    }
});

// Logout a User
app.get('/node_logout', (req, res) => {
    req.logout();
    // ERROR
    // res.redirect('/');
});

app.post('/node_register', (req, res) =>{
    //console.log('profile image is '+ img);
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        team_type: req.body.team_type,
    }
    //console.log(req.body.password);
    User.register(
        newUser,
        req.body.password,
        function (err, user){
            if (err) {
                // ERROR
                //console.log(err);
                // res.redirect('/register?error='+err);
            }else {
                console.log('success!!')
                // write into cookies, authenticate the requests
                const authenticate = passport.authenticate('local');
                authenticate(req, res, function () {
                    // SUCCESS
                    // res.sendFile(__dirname+"/src/account.html");
                })
            }
        }
    );
});

// Login
app.post('/node_login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,

    });
    req.login(
        user,
        function (err) {
            if (err){
                // ERROR
                //console.log(err);
                // res.redirect('login?error=Invalid username or password');
            }else{
                const authenticate = passport.authenticate(
                    'local',
                    {
                        // SUCCESS
                        // successRedirect: res.sendFile(__dirname+"/src/account.html"),
                        failureRedirect: "/login?error=Username and password don't match"
                    }
                );
                authenticate(req,res);
            }
        }
    )
});

// Current User
app.get('/node_get_current_user', function (req,res){
    if (req.isAuthenticated()){
        //console.log(req.user);
        res.send({
            message: "success",
            data: req.user
        });
    }else{
        res.send({
            message: "no login",
            data: {}
        });
    }
});

// Get Current Account
app.get("/node_account", (req, res) => {
    //console.log(req.isAuthenticated());
    if (req.isAuthenticated()){
        // SUCCESS
        // res.sendFile(__dirname+"/src/account.html");
    }else{
        // ERROR
        // res.redirect('/login.html?error=You need to login first');
    }
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