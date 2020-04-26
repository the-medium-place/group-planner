var db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the costs
    app.get("/api/costs", function (req, res) {
        db.cost.findAll({
            include: [db.collab]
        }).then(dbCost => res.json(dbCost));
    });

    // GET route for getting one cost
    app.get("/api/costs/:id", function (req, res) {
        db.cost.findOne({
            where: {
                id: req.params.id
            },
            include: [db.collab]
        }).then(dbCost => res.json(dbCost));
    });

    // POST route for saving a new cost. You can create an cost using the data on req.body
    app.post("/api/costs", function (req, res) {
        db.cost.create({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            purchased: req.body.purchased,
            eventId: req.body.event_id
        }).then(dbCost => res.json(dbCost));
    });


    // DELETE route for deleting costs
    app.delete("/api/costs/:id", function (req, res) {
        db.cost.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbCost => res.json(dbCost));
    });

    // PUT route for updating costs
    app.put("/api/costs/:id", function (req, res) {
        db.cost.update({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            purchased: req.body.purchased
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbCost => res.json(dbCost));
    });
};
