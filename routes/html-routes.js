// Dependencies
// =============================================================
var db = require("../models");
const moment = require("moment");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function (req, res) {
    if (req.session.username) {
      const username = req.session.username.username;
      res.render("index", { username: req.session.username.username});
    } else {
      res.render("index");
    }
  });

  app.get("/login-success", function (req, res) {
    const username = req.session.username.username;

    res.render("index", { username: req.session.username.username});
  });

  // view events page load
  app.get("/view-events", function (req, res) {

    if (req.session.username) {

      const eventArr = [];
      db.event
        .findAll({
          include: [{
            model: db.cost
          },
          {
            model: db.task
          },
          {
            model: db.collab,
            where: db.collab.id = req.session.username.id
          }],
        })
        .then((dbEvent) => {
          for (i = 0; i < dbEvent.length; i++) {
            const newObj = {};
            // filter display to only logged in user's events
            // works, but not efficient for large database?
            //for (j = 0; j < dbEvent[i].collabs.length; j++) {
            // if (req.session.username.id === dbEvent[i].collabs[j].id) {
            var momentDate = moment(dbEvent[i].date_time);
            var readyToInsert = momentDate.format("YYYY-MM-DD HH:mm:ss");
            var readyToInsertSplit = moment(readyToInsert)
              .format("lll")
              .split(" ");
            // create handlebars object for display card
            newObj.host = dbEvent[i].collabs[0].username;
            newObj.name = dbEvent[i].name;
            newObj.event_id = dbEvent[i].id;
            newObj.location = dbEvent[i].location;
            newObj.date_time = moment(readyToInsert).format("lll"); //dbEvent[i].date_time; //
            newObj.date = `${readyToInsertSplit[0]} ${readyToInsertSplit[1]} ${readyToInsertSplit[2]}`;
            newObj.time = `${readyToInsertSplit[3]} ${readyToInsertSplit[4]}`;
            newObj.description = dbEvent[i].description;
            // If there are tasks associated with the event,
            // Display them on the card
            if (dbEvent[i].tasks.length > 0) {
              const taskListArr = [];
              const tasksArr = dbEvent[i].tasks;
              tasksArr.forEach((task) => {
                const individTask = {
                  taskName: task.name,
                  taskDescription: task.description,
                  taskCompleted: task.completed,
                  taskId: task.id,
                };
                taskListArr.push(individTask);
              });
              newObj.tasks = taskListArr;
            } else {
              newObj.tasks = "No tasks associated yet";
            }
            // If there are costs associated with the event,
            // display them on the card
            if (dbEvent[i].costs.length > 0) {
              
              const costListArr = [];
              const costsArr = dbEvent[i].costs;
              costsArr.forEach((cost) => {
                const individCost = {
                  costName: cost.name,
                  costDescription: cost.description,
                  costCost: cost.cost,
                  costPurchased: cost.purchased,
                  costId: cost.id,
                };
                costListArr.push(individCost);
              });
              newObj.costs = costListArr;
            } else {
              newObj.costs = "No costs associated yet";
            }
            console.log(dbEvent[0].collabs[0].username)
            // If there are OTHER collabs associated with the event,
            // display them on the card
            if (dbEvent[i].collabs.length > 1) {
              console.log("more than one collab");
              // const collabListArr = []
              const collabArr = dbEvent[i].collabs;
              console.log(collabArr);
              collabArr.forEach((collab) => {
                const individCollab = {
                  collabUsername: collab.username

                  // costName: cost.name,
                  // costDescription: cost.description,
                  // costCost: cost.cost,
                  // costPurchased: cost.purchased,
                }
                collabListArr.push(individCollab)
                console.log(collabListArr.length)
              });
              newObj.collabs = collabsListArr;
            } else {
              newObj.collabs =
                "You! Currently, there are no other collaborators yet.";
                console.log("no collabs");
            }
            eventArr.push(newObj);
            // }
            //}
          }
          res.render("view-events", {
            events: eventArr,
            username: req.session.username.username
          });
        });
    } else {
      res.redirect("/");
    }
  });

  // redirects to create-event page
  app.get("/new-event", function (req, res) {
    if (req.session.username) {
      res.render("new-event", { username: req.session.username.username });
    } else {
      res.redirect("/");
    }
  });

  // redirects to edit-task page
  app.get("/update-task/:id", function (req, res) {
    console.log(req.session.username.id);
    if (req.session.username) {
      // ajax query for all event info from user id
      db.task
        .findOne({
          where: {
            id: req.params.id,
          },
          // include: [db.cost, db.event, db.collab],
        })
        .then((dbTask) => {
          const taskEditObj = {
            name: dbTask.dataValues.name,
            id: dbTask.dataValues.id,
            description: dbTask.dataValues.description,
            completed: dbTask.dataValues.completed,
            eventId: dbTask.dataValues.eventId,
            username: req.session.username.username
          };
          res.render("update-task", taskEditObj);
        });
    } else {
      res.redirect("/");
    }
  });

  // redirects to edit-cost page
  app.get("/update-cost/:id", function (req, res) {
    console.log("beginning of update cost route line 183");
    if (req.session.username) {
      // ajax query for all event info from user id
      db.cost
        .findOne({
          where: {
            id: req.params.id,
          },
          // include: [db.event, db.task, db.collab],
        })
        .then((dbCost) => {
          console.log(dbCost.dataValues);
          const costEditObj = {
            name: dbCost.dataValues.name,
            id: dbCost.dataValues.id,
            description: dbCost.dataValues.description,
            cost: dbCost.dataValues.cost,
            purchased: dbCost.dataValues.purchased,
            eventId: dbCost.dataValues.eventId,
            username: req.session.username.username
          };
          res.render("update-cost", costEditObj);
        });
    } else {
      res.redirect("/");
    }
  });

  app.get("/about-us", function (req, res) {
    if (req.session.username) {
      res.render("about-us", req.session.username);
    } else {
      res.redirect("/");
    }
  });

  app.get("/update-event/:id", function (req, res) {
    // ajax query for all event info from user id
    db.event
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [db.cost, db.task, db.collab],
      })
      .then((dbEvent) => {
        if (req.session.username) {
          const dateTimeObj = dbEvent.dataValues.date_time;
          var momentDate = moment(dateTimeObj);
          var readyToInsert = momentDate.format("YYYY-MM-DD HH:mm:ss");
          var readyToInsertSplit = moment(readyToInsert).format("lll").split(" ");
          console.log(readyToInsertSplit);
          dbEvent.dataValues.event_date = `${readyToInsertSplit[0]} ${readyToInsertSplit[1]} ${readyToInsertSplit[2]}`;
          dbEvent.dataValues.event_time = `${readyToInsertSplit[3]} ${readyToInsertSplit[4]}`;
          const newEventObj = {...dbEvent.dataValues}
          newEventObj.username = req.session.username.usernam;
          res.render("update-event", newEventObj);
        } else {
          res.redirect("/");
        }
      });
  });

  app.get("/login-fail", function (req, res) {
    res.render("login-fail");
    // if(req.session.username) {
    // res.render("update-event", { testEvents });
    // } else {
    //   res.render("index");
    // }
  });

  app.get("/invited-user", function (req, res) {
    res.render("invited-user");
    // if(req.session.username) {
    // res.render("update-event", { testEvents });
    // } else {
    //   res.render("index");
    // }
  });

  app.get("/edit-account", function (req, res) {
    if (req.session.username) {
      const userObj = {
        username: req.session.username.username,
        firstname: req.session.username.first_name,
        lastname: req.session.username.last_name,
        email: req.session.username.email,
        phone: req.session.username.phone,
      };
      res.render("edit-account",userObj);
    } else {
      res.redirect("/");
    }
  });
};
