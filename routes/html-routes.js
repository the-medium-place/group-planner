// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

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
      res.render("index", { welcome: `Welcome, ${username}!` });
    } else {
      res.render("index");
    }
  });

  app.get("/login-success", function (req, res) {
    const username = req.session.username.username;

    res.render("index", { welcome: `Welcome, ${username}!` });
  });

  app.get("/view-events", function (req, res) {
    if (req.session.username) {
      const eventArr = [];
      db.event.findAll({
        include: [db.cost, db.task, db.collab]
      }).then((dbEvent) => {
        for (i = 0; i < dbEvent.length; i++) {
          const newObj = {};
          // filter display to only logged in user's events
          // works, but not efficient for large database?
          for (j = 0; j < dbEvent[i].collabs.length; j++) {
            if (req.session.username.id === dbEvent[i].collabs[j].id) {
              var momentDate = moment(dbEvent[i].date_time);
              var readyToInsert = momentDate.format("YYYY-MM-DD HH:mm:ss");
              var readyToInsertSplit = moment(readyToInsert).format("lll").split(" ");
              // create handlebars object for display card
              newObj.host = dbEvent[i].collabs[0].username;
              newObj.name = dbEvent[i].name;
              newObj.event_id = dbEvent[i].id;
              newObj.location = dbEvent[i].location;
              newObj.date_time = moment(readyToInsert).format("lll"); //dbEvent[i].date_time; //
              newObj.date = `${readyToInsertSplit[0]} ${readyToInsertSplit[1]} ${readyToInsertSplit[2]}`
              newObj.time = `${readyToInsertSplit[3]} ${readyToInsertSplit[4]}`
              newObj.description = dbEvent[i].description;
              if (dbEvent[i].tasks.length > 0){
                const taskListArr = [];
                const tasksArr = dbEvent[i].tasks
                tasksArr.forEach(task => {
                  const individTask = {
                    taskName: task.name,
                    taskDescription: task.description,
                    taskCompleted: task.completed,
                  }
                  taskListArr.push(individTask)
                });
                newObj.tasks = taskListArr;
              } else {
                newObj.tasks = "No tasks associated yet"
              }
              if (dbEvent[i].costs.length > 0){
                // console.log(dbEvent[i].costs)
                // const taskListArr = [];
                // const tasksArr = dbEvent[i].tasks
                // tasksArr.forEach(task => {
                //   const individTask = {
                //     taskName: task.name,
                //     taskDescription: task.description,
                //     taskCompleted: task.completed,
                //   }
                //   taskListArr.push(individTask)
                // });
                // newObj.tasks = taskListArr;
                const costListArr = []
                const costsArr = dbEvent[i].costs
                costsArr.forEach(cost => {
                  const individCost = {
                    costName: cost.name,
                    costDescription: cost.description,
                    costCost: cost.cost,
                    costPurchased: cost.purchased,
                  }
                  costListArr.push(individCost)
                });
                newObj.costs = costListArr;
              } else {
                newObj.costs = "No costs associated yet"
              }
              eventArr.push(newObj);
            }
          }
        }
    })
        res.render("view-events", {
          events: eventArr,
        });
      } else {
        res.redirect("/");
      }
    });

  // redirects to create-event page
  app.get("/new-event", function (req, res) {
    if (req.session.username) {
      res.render("new-event");
    } else {
      res.redirect("/");
    }
  });

  app.get("/about-us", function (req, res) {
    if (req.session.username) {
      // console.log(req.session.username.username)
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
        const dateTimeObj = dbEvent.dataValues.date_time;
        var momentDate = moment(dateTimeObj);
        var readyToInsert = momentDate.format("YYYY-MM-DD HH:mm:ss");
        var readyToInsertSplit = moment(readyToInsert).format("lll").split(" ");
        console.log(readyToInsertSplit)
        dbEvent.dataValues.event_date = `${readyToInsertSplit[0]} ${readyToInsertSplit[1]} ${readyToInsertSplit[2]}`
        dbEvent.dataValues.event_time = `${readyToInsertSplit[3]} ${readyToInsertSplit[4]}`
      if (req.session.username) {
        res.render("update-event", dbEvent.dataValues);
      } else {
        res.redirect("/");
      }
    })
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
};
