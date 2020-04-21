// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set up express-session to save user sessions
app.use(session({
  secret: "keyboard cat",
  resave: true,
  // add store method here later!!
  saveUninitialized: true,
  cookie: {
    maxAge: 720000
  }
}))

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================

require("./routes/cost-api-routes.js")(app);
require("./routes/collab-api-routes.js")(app);
require("./routes/event-api-routes.js")(app);
// require("./routes/task-api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
