// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// const path = require("path");

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
    res.render("index", { welcome: "Welcome, valued user" });
  });

  app.get("/view-events", function (req, res) {

    if (req.session.username) {
      res.render("view-events", { test: "dion connected" });
    } else {

      res.render("index");
    }

  });

  app.get("/new-event", function (req, res) {

    if (req.session.username) {
      res.render("new-event", { test: "dion connected" });
    } else {
      res.render("index");
    }
  });

  app.get("/about-us", function (req, res) {
    if (req.session.username) {
      res.render("about-us", { test: "dion connected" });
    } else {
      res.render("index");
    }

  });

  app.get("/update-event", function (req, res) {
    if(req.session.username) {
    res.render("update-event", { event });
    } else {
      res.render("index");
    }
  });
  

  //   // Route to the cms page
  //   app.get("/cms", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/cms.html"));
  //   });

  //   // blog route loads blog.html
  //   app.get("/blog", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/blog.html"));
  //   });
};
