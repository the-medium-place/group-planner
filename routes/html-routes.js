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
    res.render("index");
    //   res.send("connected dionnnnnnnnnnn");
    //   cat.all(function(data) {
    //     var hbsObject = {
    //       cats: data
    //     };
    //     console.log(hbsObject);
    //     res.render("index", hbsObject);
    //   });
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
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

      for (i=0; i<dbEvent.length; i++){
        const newObj = {};
        const eventListObj = {};

        // filter display to only logged in user's events
        // works, but not efficient for large database?
        for (j=0; j<dbEvent[i].collabs.length; j++){
          if (req.session.username.id === dbEvent[i].collabs[j].id){
            // create handlebars object for display card
            newObj.host = dbEvent[i].collabs[0].username;
            newObj.name = dbEvent[i].name;
            newObj.location = dbEvent[i].location;
            newObj.date_time = dbEvent[i].date_time;
            newObj.description = dbEvent[i].description;
            eventArr.push(newObj);

            // create handlebars object for event selection list
            eventListObj.event_name = dbEvent[i].name;
            eventListObj.event_id = dbEvent[i].id;
            eventNameList.push(eventListObj);


          }
        } 
      } 
      console.log(eventNameList);   
      if (req.session.username) { 
        res.render("view-events", {
          events: eventArr,
          eventList: eventNameList
        });
      } else {
        res.render("index");
      }

    });
  });

  app.get("/new-event", function (req, res) {
    if (req.session.username) {
      res.render("new-event");
    } else {
      res.render("index");
    }
  });

  app.get("/about-us", function (req, res) {
    if (req.session.username) {
      // console.log(req.session.username.username)
      res.render("about-us", req.session.username);
    } else {
      res.render("index");
    }
  });

  app.get("/update-event", function (req, res) {
    // ajax query for all event info from user id

    if (req.session.username) {
      res.render("update-event");
    } else {
      res.render("index");
    }
  });

  app.get("/login-fail", function (req, res) {
    res.render("login-fail");
    // if(req.session.username) {
    // res.render("update-event", { testEvents });
    // } else {
    //   res.render("index");
    // }
  });

};
