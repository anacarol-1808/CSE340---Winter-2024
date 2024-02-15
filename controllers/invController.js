const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Show item detail view
 * ************************** */
invCont.showItemDetail = async function (req, res, next) {
  const inv_id = req.params.vehicleId
  const vehicleData = await invModel.getItemById(inv_id)
  const grid = await utilities.buildItemDetailView(vehicleData)
  let nav = await utilities.getNav()
  const itemName = vehicleData[0].inv_model
  const itemMake = vehicleData[0].inv_make
  const itemYear = vehicleData[0].inv_year
  res.render("./inventory/vehicle-detail", { // THERE may be a mistake here. Maybe try to create a new file in the views folder que se chama item-detail instead of classification.
      title: itemYear + " " + itemMake + " " + itemName,
      nav,
      grid,
  });
};

/* ***************************
 *  Render add new classification view
 * ************************** */
invCont.renderAddClassification = async function (req, res, next) {
  // Implement logic to render the add new classification view
  res.render("./inventory/add-classification", { title: "Add New Classification" });
};

/* ***************************
 *  Render add new inventory view
 * ************************** */
invCont.renderAddInventory = async function (req, res, next) {
  // Implement logic to render the add new inventory view
  res.render("./inventory/add-inventory", { title: "Add New Inventory" });
};

// Export individual controllers
module.exports = invCont;