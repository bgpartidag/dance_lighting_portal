require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
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
    { useNewUrlParser: true }, function () {
        console.log("db connection successful");
    });

const danceSchema = {
    choreographer: String,
    length: String,
    comments: String,
    cues: [{
        start_time: Number,
        end_time: Number,
        sort_order: Number,
        lights: [{ light_name: String, color: String, brightness: String }]
    }]
}

const Dance = mongoose.model('Dance', danceSchema);

// Requirements for a show
const showSchema = {
    team_username: {
        type: String,
        required: true
    },
    show_name: {
        type: String,
        require: [true, "Show must be named"]
    },
    contact_name: {
        type: String,
        require: [true, "Contact Name cannot be empty"]
    },
    contact_email: {
        type: String,
        require: [true, "Contact String cannot be empty"]
    },
    contact_phone: {
        type: String,
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
        { dance_id: String, sort_order: Number }
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

// Register New User
app.post('/node_register', (req, res) => {

    const newUser = {
        username: req.body.username,
        email: req.body.email,
        team_type: req.body.team_type,
    }

    User.register(
        newUser,

        req.body.password,

        function (err, user) {
            if (err) {
                res.send({
                    message: "error",
                    data: err
                });
            } else {
                console.log('success!!')
                const authenticate = passport.authenticate('local');
                authenticate(req, res, function () {
                    res.send({
                        message: "success",
                        user: req.user
                    });
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


    req.login(user, function (err) {
        if (err) {
            res.send({
                message: "error",
                data: err
            });
        } else {
            const authenticate = passport.authenticate(
                'local',
                {},
                (error, userExist, info) => {
                    if (userExist) {
                        res.send({
                            message: "success",
                            user: req.user
                        });
                    } else {
                        res.send({
                            message: "error",
                            data: info
                        });
                    }
                });
            authenticate(req, res);
        }
    }
    )
});

// Logout a User
app.get('/node_logout', (req, res) => {
    req.logout();
    res.send({
        message: "success"
    })
});

// Get Current User
app.get('/node_get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user
        });
    } else {
        res.send({
            message: "no login",
            data: {}
        });
    }
});

// Get Show by Id
app.get('/node_get_show_by_id', function (req, res) {
    Show.findOne(

        { "_id": req.query.show_id }

        , function (err, data) {
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

// Get All Shows in database
app.get("/node_get_all_shows", function (req, res) {
    Show.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

// Get Dance by Id
app.get('/node_get_dance_by_id', function (req, res) {
    Dance.findOne(

        { "_id": req.query.dance_id }

        , function (err, data) {
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
        })
});

// Get All Dances in a show
app.get('/node_get_dances_by_shows', function (req, res) {
    // TODO: Maybe find??
});

//Add new or Update Show to the database
app.post("/node_add_show", (req, res) => {

    const show = req.body.show;

    if (show._id) {
        // Update existed show
        Show.updateOne({ _id: show._id },
            { $set: show },
            { runValidators: true },
            (err, info) => {
                if (err) {
                    res.send({
                        "message": err,
                        "show": show,
                    });
                } else {
                    res.send({
                        "message": "success"
                    })
                }
            });
    } else {
        // create a new movie
        const newShow = new Show(show);
        newShow.save(
            (err, new_show) => {
                if (err) {
                    res.send({
                        "message": err,
                        "show": show
                    });
                } else {
                    res.send({
                        "message": "success",
                    });
                }
            });
    }
});

//Add new or Update Dance to the database
//If New push it's Id onto Show Dance List
app.post("/node_add_dance", (req, res) => {
    // TODO: Figure out how to only add it to specified show

    const dance = req.body.dance;
    const show_id = req.body.show_id;
    const order = req.body.order;

    if (dance._id) {
        // Update existed dance
        Dance.updateOne({ _id: dance._id },
            { $set: dance },
            { runValidators: true },
            (err, info) => {
                if (err) {
                    res.send({
                        "message": err,
                        "dance": dance,
                    });
                } else {
                    res.send({
                        "message": "success"
                    })
                }
            });
    } else {
        // create a new movie
        const newDance = new Dance(dance);
        newDance.save(
            (err, new_dance) => {
                if (err) {
                    res.send({
                        "message": err,
                        "dance": dance
                    });
                } else {
                    // Add New Dance Id to show's dance list
                    const dance_for_list = {
                        dance_id: new_dance._id,
                        sort_order: order + 1
                    };

                    Show.updateOne({ _id: show_id },
                        {
                            $push: { dances: dance_for_list }
                        },
                        {},
                        (err, info) => {
                            if (err) {
                                res.send({
                                    message: "database error"
                                });
                            } else {
                                res.send({
                                    message: "success"
                                });
                            }
                        }
                    );
                }
            }
        );
    }
});


// Add new Cue
app.post('/node_add_cue', (req, res) => {
    //Add the cue to the dance
    const dance_id = req.body.dance_id;
    const cue = req.body.cue;

    Dance.updateOne(
        { _id: dance_id},
        {
            $push: { lights: cue }
        },
        {},
        (err, info) => {
            if (err) {
                res.send({
                    message: "database error"
                });
            } else {
                res.send({
                    message: "success"
                });
            }
        }
    );
});