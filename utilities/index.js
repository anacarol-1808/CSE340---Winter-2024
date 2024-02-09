const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the vehicle detail view HTML
* ************************************ */
Util.buildItemDetailView = async function(vehicleData){
  let grid
  if(vehicleData.length > 0){
    grid = '<div id="vehicle-details-display">'
    vehicleData.forEach(vehicle => { 
      let leftDiv = '<div id="vehicle-image">'
      leftDiv += '<img src="' + vehicle.inv_image 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" />' + '</div>'
      grid += leftDiv
      let rightDiv = '<div id="vehicle-details">'
      rightDiv += '<span class="bold">' + vehicle.inv_make + ' '
      rightDiv += vehicle.inv_model + ' Details' + '</span>'
      let price = parseInt(vehicle.inv_price, 10)
      rightDiv += '<p>' + '<span class="bold">Price: </span>' 
      rightDiv += price.toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0}) 
      rightDiv += '</p>'
      rightDiv += '<p>' + '<span class="bold">Description: </span>' + vehicle.inv_description
      rightDiv += '</p>'
      rightDiv += '<p>' + '<span class="bold">Color: </span>' + vehicle.inv_color
      rightDiv += '</p>'
      rightDiv += '<p>' +  '<span class="bold">Miles: </span>' + parseInt(vehicle.inv_miles, 10).toLocaleString('en-US')
      rightDiv += '</p>'
      rightDiv += '</div>'
      grid += rightDiv
    })
    grid += '</div>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
 * Build the login view HTML
 * ************************************ */
Util.buildLogin = async function() {
  let loginView = '<div id="login-form">';
  loginView += '<form action="/login" method="POST">';
  loginView += '<label for="email">Email:</label>';
  loginView += '<input type="text" id="email" name="email" required>';
  loginView += '<label for="password">Password:</label>';
  loginView += '<input type="password" id="password" name="password" required>';
  loginView += '<button type="submit">Login</button>';
  loginView += '</form>';
  loginView += '<p>Don\'t have an account? <a href="/register">Register here</a></p>';
  loginView += '</div>';
  return loginView;
};


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util