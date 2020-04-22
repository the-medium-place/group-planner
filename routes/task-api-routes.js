const db = require("../models")


module.exports = function (app) {

    // GET route for getting all of the tasks
    app.get("/api/tasks", function (req, res) {
        db.task.findAll({
            include: [db.collab]
        }).then(dbTask => res.json(dbTask));
    });

    // GET route for getting a single task
    app.get("/api/tasks/:id", function (req, res) {
        db.task.findOne({
            where: {
                id: req.params.id
            },
            include: [db.collab]
        }).then(dbTask => res.json(dbTask));
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

    // POST route for saving a new task
    app.post("/api/tasks", function (req, res) {
        db.task.create({
            name: req.body.name,
            description: req.body.description,
        }).then(dbTask => res.json(dbTask));
    });

    // DELETE route for deleting tasks
    app.delete("/api/tasks/:id", function (req, res) {
        db.task.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbTask => res.json(dbTask));
    });

    // PUT route for updating tasks
    app.put("/api/tasks/:id", function (req, res) {
        db.task.update({
            completed: req.body.completed
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbTask => res.json(dbTask));
    });
};