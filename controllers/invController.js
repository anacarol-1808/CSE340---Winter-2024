const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
// const itemModel = require("../models/inventory-model")
const invCont = {}
// const itemDetailController = {};

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

// /* ***************************
//  *  Show item detail view
//  * ************************** */
// itemDetailController.showItemDetail = async function (req, res, next) {
//   const inv_id = req.params.inv_id

//   // Fetch the data for the specific vehicle from your database
//   const vehicleData = await itemModel.getItemById(inv_id)
//   // Assuming you have a utility function for building the detail view
//   const detailView = await utilities.buildItemDetailView(vehicleData)
//   let detail = await utilities.getDetail()
//   const itemName = vehicleData[0].inv_model
//   const itemMake = vehicleData[0].inv_make
//   const itemYear = vehicleData[0].inv_year
//   res.render("./inventory/item-detail", {
//       title: itemYear + " " + itemMake + " " + itemName,
//       detail,
//       detailView,
//   });
// };

// Export individual controllers
/*module.exports = { invCont, itemDetailController };*/
module.exports = invCont;