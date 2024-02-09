const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  //req.flash("notice", "This is a flash message.") // here, the first parameter 'notice' becames the class of my message, and can be used in CSS
  res.render("index", {title: "Home", nav})
}

module.exports = baseController