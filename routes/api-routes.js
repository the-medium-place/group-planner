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
        // console.log(req);
        // console.log(res);
        // db.Event.findAll({}).then((dbEvent) => {
        //     res.send("task page");
        //     // res.json(dbEvent);
        // });
        res.send("test");

    });
    // GET route for getting all of the event tasks
    app.get("/api/events", function (req, res) {

    });
    // GET route for getting all event costs
    app.get("/api/events", function (req, res) {

    });
    // GET route for getting all event collabs
    app.get("/api/events", function (req, res) {

    });


    

    // POST route for saving a new event. You can create an event using the data on req.body
    app.post("/api/events", function (req, res) {

          // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Event.create({
        name: req.body.name,
        descripton: req.body.description,
        location: req.body.location,
        date_time: req.body.date_time

      }).then(function(dbTodo) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbTodo);
      });

    });




    // DELETE route for deleting todos. You can access the todo's id in req.params.id
    app.delete("/api/todos/:id", function (req, res) {

    });

    // PUT route for updating todos. The updated todo will be available in req.body
    app.put("/api/todos", function (req, res) {

    });
};
