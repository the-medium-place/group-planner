var db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the events
    app.get("/api/events", function (req, res) {
        db.event.findAll({
            include: [db.cost, db.task, db.collab]
        }).then(dbEvent => res.json(dbEvent));
    });

    // GET route for getting a single event
    app.get("/api/events/:id", function (req, res) {
        db.event.findOne({
            where: {
                id: req.params.id
            },
            include: [db.cost, db.task, db.collab]
        }).then(dbEvent => res.json(dbEvent));
    });

    // // GET route for getting event tasks
    // app.get("/api/events/:id/tasks", function (req, res) {

    // });

    // // GET route for getting event costs
    // app.get("/api/events/:id/costs", function (req, res) {

    // });

    // // GET route for getting event collabs
    // app.get("/api/events/:id/collabs", function (req, res) {

    // });

    // POST route for saving a new event. You can create an event using the data on req.body
    app.post("/api/events", function (req, res) {
        const userID = req.session.username.id;
        console.log(userID);

        db.event.create({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            date_time: req.body.date_time
        }).then((dbEvent) => {
            console.log(dbEvent)
            console.log(dbEvent.collabevents)




            res.json(dbEvent)
        });
    });

    // DELETE route for deleting events
    app.delete("/api/events/:id", function (req, res) {
        db.event.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbEvent => res.json(dbEvent));
    });

    // PUT route for updating events
    app.put("/api/events/:id", function (req, res) {
        db.event.update({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            date_time: req.body.date_time,
            collabId: req.session.username.id
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbEvent => res.json(dbEvent));
    });
};
