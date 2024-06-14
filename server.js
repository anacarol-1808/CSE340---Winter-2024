/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities/");
const session = require("express-session");
const pool = require("./database");
const accountRoute = require("./routes/accountRoute");
const bodyParser = require("body-parser")
const invController = require("./controllers/invController")    //assigment_04

/* ***********************
 * Middleware
 * ************************/
app.use(session ({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true})) // for parsing application/x-www-form-urlencoded

/* **************************
 * View Engine and Templates
 ****************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));
// Inventory routes
app.use("/inv", utilities.handleErrors(inventoryRoute));
app.get('/inv/add-classification', invController.renderAddClassification); // assigment_04
app.get('/inv/add-inventory', invController.renderAddInventory); // assigment_04
// Account route
app.use("/account", utilities.handleErrors(accountRoute));
// Intentional 500 Error Route
app.use('/error', (req, res, next) => {
  next({ status: 500, message: 'You triggered an intentional server error.' });
});

// Intentional error handling middleware - place as second least
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Intentional Error at: "${req.originalUrl}": ${err.message}`);
  res.status(err.status || 500).render('errors/error', {
    title: 'Intentional Server Error (500)',
    status: '500',
    message: 'An intentional error occurred. Check the console for details.',
    nav,
  });
});

// Account error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
  console.log('Error in Account Route');
})

// Catch-all 404 error handling middleware - must be last
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if (err.status == 404) { 
    message = err.message;
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?';
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  });
});



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
