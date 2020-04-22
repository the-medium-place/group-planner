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

  const testEvents = {
    event1: {
      name: "Flying like Hinata",
      location: "Karasuno High School",
      date: "Spring tournament",
      host: "Aoba Josai",
      collaborators: "Nobody",
      tasks: "No tasks",
      costs: "Free"
    },
    event2: {
      name: "UA school festival",
      location: "UA High School",
      date: "End of November",
      host: "UA Class 1-A",
      collaborators: "Everybody",
      tasks: "Always busy",
      costs: "$200,000"
    },
  };

  app.get("/view-events", function (req, res) {
    if (req.session.username) {
      res.render("view-events", { testEvents });
    } else {
      res.render("index");
    }
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
    if (req.session.username) {
      res.render("update-event", { testEvents });
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

  //   // Route to the cms page
  //   app.get("/cms", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/cms.html"));
  //   });

  //   // blog route loads blog.html
  //   app.get("/blog", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/blog.html"));
  //   });
};
