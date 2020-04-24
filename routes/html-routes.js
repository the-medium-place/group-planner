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
    db.event.findAll({
      include: [db.cost, db.task, db.collab]
    }).then((dbEvent) => {
      const eventArr = [];
      const eventNameList = []


      
      console.log(readyToInsert);




      for (i = 0; i < dbEvent.length; i++) {
        const newObj = {};
        const eventListObj = {};
     

        // filter display to only logged in user's events
        // works, but not efficient for large database?
        for (j = 0; j < dbEvent[i].collabs.length; j++) {
          if (req.session.username.id === dbEvent[i].collabs[j].id) {
            


            var momentDate = moment(dbEvent[i].date_time);
            var readyToInsert = momentDate.format("YYYY-MM-DD HH:mm:ss");
            // create handlebars object for display card
            newObj.host = dbEvent[i].collabs[0].username;
            newObj.name = dbEvent[i].name;
            newObj.location = dbEvent[i].location;
            newObj.date_time = moment(readyToInsert).format("lll"); //dbEvent[i].date_time; //
            // newObj.timer-time = 
            newObj.description = dbEvent[i].description;
            newObj.event_id = dbEvent[i].id;
            eventArr.push(newObj);

            // create handlebars object for event selection list
            // eventListObj.event_name = dbEvent[i].name;
            // eventNameList.push(eventListObj);
            

            // anotherTimer = timerTest;
            // console.log(anotherTimer);
          }
        }
      }

      // console.log(eventArr);
      // console.log(eventNameList);
      if (req.session.username) {
        res.render("view-events", {
          events: eventArr,
          // eventList: eventNameList
        });
      } else {
        res.render("index");
      }

    });
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
        console.log(dbEvent.dataValues)
      // res.json(dbEvent)
      // let date_time = "2020-04-30 19:12:00";
      // let dateSplit = date_time.split(" ")[0];
      // let timeSplit = date_time.split(" ")[1];
      // let test = {
      //   name: "Study hall",
      //   description: "This is where I study",
      //   location: "Homeroom",
      //   date: dateSplit,
      //   time: timeSplit,
      // };
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
