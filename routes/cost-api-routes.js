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
  app.get("/api/costs", function (req, res) {
    console.log(typeof db.cost);
    db.cost.findAll({}).then((dbCost) => {
      res.json(dbCost);
      // res.json(dbEvent);
    });
  });

  // POST route for saving a new event. You can create an event using the data on req.body
  app.post("/api/costs", function (req, res) {
    db.cost.create({
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      purchased: req.body.purchased,
      eventId: req.body.eventId

    }).then(function (dbCost) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbCost);
    });

  });




  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", function (req, res) {

  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", function (req, res) {

  });
};
