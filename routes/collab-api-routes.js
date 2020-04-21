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
  app.get("/api/collabs", function (req, res) {
    console.log(typeof db.event);
    db.collab.findAll({}).then((dbCollab) => {
      res.json(dbCollab);
      // res.json(dbEvent);
    });
  });

  // POST route for saving a new event.
  app.post("/api/collabs", function (req, res) {
    db.collab.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }).then(function (dbCollab) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbCollab);
    });
  });

  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", function (req, res) {

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function (req, res) {

  });
};
