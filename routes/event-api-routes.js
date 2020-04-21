// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the events
  app.get("/api/events", function (req, res) {
    console.log(typeof db.event);
    db.event.findAll({}).then((dbEvent) => {
      res.json(dbEvent);
      // res.json(dbEvent);
    });
  });
  // // GET route for all events by user id
  // app.get("/api/events", function (req, res) {

  // });

  // // GET route for getting all event costs by event id
  // app.get("/api/events", function (req, res) {

  // });

  // // GET route for getting all event collabs by event id
  // app.get("/api/events", function (req, res) {

  // });




  // POST route for saving a new event. You can create an event using the data on req.body
  app.post("/api/events", function (req, res) {
    db.event.create({
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      date_time: req.body.date_time

    }).then(function (dbEvent) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbEvent);
    });

  });




  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", function (req, res) {

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function (req, res) {

  });
};
