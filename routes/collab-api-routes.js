// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const bcrypt = require("bcrypt");
// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the collaborators
    app.get("/api/collabs", function (req, res) {
        console.log(typeof db.event);
        db.collab.findAll({}).then((dbCollab) => {
            res.json(dbCollab);
            // res.json(dbEvent);
        });
    });

    //GET route for getting all of the events for 1 collab
    app.get("/api/collabs/:id/events", function(req, res) {
        db.collab.findOne({
            where: {
                id: req.params.id
            }
        }).then(async dbCollab => {
            if(!dbCollab) { return res.json(null); }
            const events = await dbCollab.getEvents();
            res.json(events);
        });
    });

    app.post("/signup", (req, res) => {

        db.collab.create({
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone
            // costId: req.body.costId,
            // taskId: req.body.taskId,
            // eventId: req.body.eventId
        }).then(function (dbCollab) {
            res.status(200).json(dbCollab);
        });
    });

    app.post("/login", (req, res) => {
        console.log("start of login route");
        console.log(req.body);
        console.log(req.body.username);
        // console.log(req.body.password);
        db.collab.findOne({
            where: {
                username: req.body.username
            }
        }).then(dbCollab => {
            if (dbCollab.username === null){
                console.log("could not find user")
            }
            if (bcrypt.compareSync(req.body.password, dbCollab.password)) {
                req.session.username = dbCollab;
                console.log("success");
                // res.redirect('/view-events');
                res.redirect("/view-events");
            } else {
                console.log("unsuccess");
                res.redirect("/login-fail");
                // res.redirect('/');
            }
        });
    });

    //enable session storage
    app.get("/readsessions", (req, res) => {
        res.json(req.session);
    });

    // Logout route for user info
    app.delete("/logout", (req, res) => {
        req.session.destroy(function(err){
            if (err) throw err;
            res.send("successful logout");
        })

    });

};
