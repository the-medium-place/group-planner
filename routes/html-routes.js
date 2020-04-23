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

  // const testEvents = {
  //   event1: {
  //     name: "Flying like Hinata",
  //     location: "Karasuno High School",
  //     date: "Spring tournament",
  //     host: "Aoba Josai"
  //   },
  //   event2: {
  //     name: "UA school festival",
  //     location: "UA High School",
  //     date: "End of November",
  //     host: "UA Class 1-A"
  //   }
  // }


  app.get("/view-events", function (req, res) {
    db.event.findAll({
      include: [db.cost, db.task, db.collab]
    }).then((dbEvent) => {
      const eventArr = [];

      for (i=0; i<dbEvent.length; i++){
        const newObj = {};
        newObj.name = dbEvent[i].name;
        newObj.location = dbEvent[i].location;
        newObj.date_time = dbEvent[i].date_time;
        newObj.description = dbEvent[i].description;
        eventArr.push(newObj);

      }    
      if (req.session.username) {
        res.render("view-events", {events: eventArr});
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
      res.render("about-us");
    } else {
      res.render("index");
    }

  });

  app.get("/update-event", function (req, res) {
    if (req.session.username) {
      res.render("update-event", { testEvents });
    } else {
      res.render("index");
    }
  });

  app.get("/login-fail", function (req, res) {
    res.render("login-fail")
    // if(req.session.username) {
    // res.render("update-event", { testEvents });
    // } else {
    //   res.render("index");
    // }
  });

};
