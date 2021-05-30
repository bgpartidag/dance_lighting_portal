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

const cueSchema = {
    parent_dance: {
        type: String,
        require: true
    },
    start_time: {
        type: String,
        validate: {
            validator: function (value) {
                return /\d{2}:\d{2}/.test(value)
            },
            message: "Time format must be mm:ss"
        }
    },
    end_time: {
        type: String,
        validate: {
            validator: function (value) {
                return /\d{2}:\d{2}/.test(value)
            },
            message: "Time format must be mm:ss"
        }
    },
    details: String,
    lights: [{
        light_name: String,
        color: String,
        brightness: String
    }]
}

const Cue = mongoose.model('Cue', cueSchema);

const danceSchema = {
    parent_show: {
        type: String,
        require: true
    },
    choreographer: String,
    length: String,
    comments: String,
    cues: [{
        cue_id: {
            type: String,
            require: true
        },
        sort_order: {
            type: Number,
            require: true
        }
    }]
}

const Dance = mongoose.model('Dance', danceSchema);

// Requirements for a show
const showSchema = {
    team_username: {
        type: String,
        require: true
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
    dances: [{
        dance_id: {
            type: String,
            require: true,
        },
        sort_order: {
            type: String,
            require: true,
        }
    }]
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
// NEED FIELDS AND PARAMETERS
app.post('/node_register', (req, res) => {

    // NEEDED : the name for username/email/team type fields in register form
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        team_type: req.body.team_type,
    }

    User.register(
        newUser,

        // NEEDED : the name for password field form register form
        req.body.password,

        function (err, user) {
            if (err) {
                res.send({
                    message: "Error Registering User to Database",
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
// NEED FIELDS AND PARAMETERS
app.post('/node_login', (req, res) => {

    // NEEDED : the names for username and password fields in login forms
    const user = new User({
        username: req.body.username,
        password: req.body.password,

    });


    req.login(user, function (err) {
        if (err) {
            res.send({
                message: "Error Logging in User",
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
                            message: "Error Authenticating User",
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
            message: "No Login",
            data: {}
        });
    }
});

// Deleting user
// NEED FIELDS AND PARAMETERS
app.post('/delete_user_by_id', (req, res) => {

    // NEED : the ID of the User
    const user_id = req.body.user_id

    User.deleteOne(
        { '_id': user_id },
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "Database Error Deleting User"
                });
            } else {
                res.send({
                    "message": "success"
                });
            }
        }
    );
});

// Get Show by Id
// NEED FIELDS AND PARAMETERS
app.get('/node_get_show_by_id', function (req, res) {

    // NEEDED : the id for the dance passed with parameter named "show_id"
    const show_id = req.query.show_id;

    Show.findOne(
        { "_id": show_id },
        function (err, data) {
            if (err || data.length === 0) {
                res.send({
                    "message": "Internal Database Error when Finding Show",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data
                })
            }
        }
    );
});

// Get All Shows in database
app.get("/node_get_all_shows", function (req, res) {
    Show.find(function (err, data) {
        if (err) {
            res.send({
                "message": "Internal Database Error Getting All Shows",
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
// NEED FIELDS AND PARAMETERS
app.get('/node_get_dance_by_id', function (req, res) {

    // NEEDED : the id for the dance passed with parameter named "dance_id"
    const dance_id = req.query.dance_id;

    Dance.findOne(
        { "_id": dance_id },
        function (err, data) {
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
        }
    )
});

// Get All Dances in a show
// NEED FIELDS AND PARAMETERS
app.get('/node_get_dances_by_show', function (req, res) {
    
    // NEEDED: the Show ID
    const show_id = req.body.show_id;

    Dance.find(
        { parent_show: show_id },
        function (err, data) {
            if (err || data.length === 0) {
                res.send({
                    "message": "Internal Database Error Getting All Dances under a Show",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data
                })
            }
        }
    )
});

// Get All Cues in a dance
// NEED FIELDS AND PARAMETERS
app.get('/node_get_cues_by_dance', function (req, res) {

    // NEEDED: the Dance ID
    const dance_id = req.body.dance_id;

    Cue.find(
        { parent_dance: dance_id },
        function (err, data) {
            if (err || data.length === 0) {
                res.send({
                    "message": "Internal Database Error Getting All Cues under a Dance",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data
                })
            }
        }
    )
});

//Add new or Update Show to the database
// NEED FIELDS AND PARAMETERS
app.post("/node_add_show", (req, res) => {

    // NEEDED : a Show Dictionary Object with all fields ready to be saved
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
// NEED FIELDS AND PARAMETERS
app.post("/node_add_dance", (req, res) => {

    // NEEDED : a Dance Dictionary Object with all fields ready to be saved and the Id of the Show
    // NEEDED : the Id of the Show it's under and the length of it's dance list
    const dance = req.body.dance;
    const show_id = req.body.show_id;
    const order = req.body.dance_list_length;

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
        // create a new dance
        const newDance = new Dance(dance);
        newDance.save(
            (err, new_dance) => {
                if (err) {
                    res.send({
                        "message": err,
                        "show": show
                    });
                } else {
                    // If created need to add ID to Show's list
                    console.log(dance_id._id)
                    // const dance_for_list = {
                    //     dance_id: new_dance._id,
                    //     sort_order: order + 1
                    // }
                    // Show.updateOne(
                    //     { _id: show_id },
                    //     {
                    //         $push: { dances: dance_for_list }
                    //     },
                    //     {},
                    //     (err, info) => {
                    //         if (err) {
                    //             res.send({
                    //                 message: "Database Error Updating Show with new_dance._id"
                    //             });
                    //         } else {
                                res.send({
                                    message: "success"
                                });
                    //         }
                    //     }
                    // );
                }
            });
    }
});

// Add new or Update Cue
// NEED FIELDS AND PARAMETERS
app.post('/node_add_cue', (req, res) => {

    // NEEDED : a Cue Dictionary Object with all fields ready to be saved
    // NEEDED : the Id of the Dhow it's under and the length of it's cue list
    const cue = req.body.cue;
    const dance_id = req.body.dance_id;
    const order = req.body.cue_list_length;

    if (cue._id) {
        // Update existed cue
        Cue.updateOne(
            { _id: cue._id },
            { $set: cue },
            { runValidators: true },
            (err, info) => {
                if (err) {
                    res.send({
                        "message": err,
                        "cue": cue,
                    });
                } else {
                    res.send({
                        "message": "success"
                    })
                }
            }
        );
    } else {
        // create a new cue
        const newCue = new Cue(cue);
        newCue.save(
            (err, new_cue) => {
                if (err) {
                    res.send({
                        "message": err,
                        "show": show
                    });
                } else {
                    // If created need to add ID to Show's list
                    console.log(newCue._id);
                    
                    // const cue_for_list = {
                    //     cue_id: new_cue._id,
                    //     sort_order: order + 1
                    // }
                    // Dance.updateOne(
                    //     { _id: dance_id },
                    //     {
                    //         $push: { cues: cue_for_list }
                    //     },
                    //     {},
                    //     (err, info) => {
                    //         if (err) {
                    //             res.send({
                    //                 message: "Database Error Updating Dance with new_cue._id"
                    //             });
                    //         } else {
                                res.send({
                                    message: "success"
                                });
                    //         }
                    //     }
                    // )
                }
            }
        );
    }
});

// Delete cue by id
// NEED FIELDS AND PARAMETERS
app.post('/delete_cue_by_id', (req, res) => {

    // NEEDED: the Cue id
    const cue_id = req.body._id

    Cue.deleteOne(
        { '_id': cue_id },
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "Database Error Deleting Cue"
                });
            } else {
                res.send({
                    "message": "success"
                });
            }
        }
    );
});

// Delete Dance by id and All its Cues
// NEED FIELDS AND PARAMETERS
app.post('/delete_dance_by_id', (req, res) => {

    // NEEDED: the Dance id
    const dance_id = req.body._id

    Cue.deleteMany(
        { '_id': { $in: dance_id } },
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "Database Error Deleting Cues by Parent Dance id"
                });
            } else {
                Dance.deleteOne(
                    { '_id': dance_id },
                    {},
                    (err) => {
                        if (err) {
                            res.send({
                                "message": "Database Error Deleting Dance by id"
                            });
                        } else {
                            res.send({
                                "message": "success"
                            });
                        }
                    }
                );
            }
        }
    );
});

// NEED FIELDS AND PARAMETERS
app.post('/delete_show_by_id', (req, res) => {

    // NEEDED: the Show id and list of it's Dance ids
    const show_id = req.body._id;
    const dance_ids = req.body._ids;

    Cue.deleteMany(
        { '_id': { $in: dance_ids } },
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "Database Error Deleting Cues by Parent Dance ids"
                });
            } else {
                Dance.deleteMany(
                    { '_id': { $in: show_id } },
                    {},
                    (err) => {
                        if (err) {
                            res.send({
                                "message": "Database Error Deleting Dance by Parent Show id"
                            });
                        } else {
                            Show.deleteOne(
                                { '_id': show_id },
                                {},
                                (err) => {
                                    if (err) {
                                        res.send({
                                            "message": "Database Error Deleting Show by id"
                                        });
                                    } else {
                                        res.send({
                                            "message": "success"
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});