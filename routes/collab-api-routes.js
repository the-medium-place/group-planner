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

  // GET route for getting all of the events
  app.get("/api/collabs", function (req, res) {
    console.log(typeof db.event);
    db.collab.findAll({}).then((dbCollab) => {
      res.json(dbCollab);
      // res.json(dbEvent);
    });
  });

  app.post("/signup", (req, res) => {
  
    db.collab.create({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      // costId: req.body.costId,
      // taskId: req.body.taskId,
      // eventId: req.body.eventId
    }).then(function (dbCollab) {
      res.status(200).json(dbCollab);
    });
  });

  app.get("/login", (req, res) => {
    db.collab.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbCollab => {
      if (bcrypt.compareSync(req.body.password, dbCollab.password)) {
        req.session.username = dbCollab;
        res.send("success")
      } else {
        res.send("You need to log in!");
      }
    })
  })

  //enable session storage
  app.get("/readsessions", (req, res) => {
  
    res.json(req.session);

  })

  // Logout route for user info
  app.delete("/logout", (req, res) => {
    req.session.destroy(function(err){
      if (err) throw err;
      res.send("successful logout");
    })

  });




  // // POST route for saving a new collab.
  // app.post("/api/collabs", function (req, res) {
  //   db.collab.create({
  //     first_name: req.body.first_name,
  //     last_name: req.body.last_name,
  //     costId: req.body.costId,
  //     taskId: req.body.taskId,
  //     eventId: req.body.eventId
  //   }).then(function (dbCollab) {
  //     // We have access to the new todo as an argument inside of the callback function
  //     res.json(dbCollab);
  //   });
  // });



  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function (req, res) {

  });
};
