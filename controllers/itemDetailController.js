const item = require("../models/item-model"); // Replace with your actual model
const utilities = require("../utilities/");

const itemDetailController = {};

/* ***************************
 *  Show item detail view
 * ************************** */
itemDetailController.showItemDetail = async function (req, res, next) {
    const vehicleId = req.params.vehicleId;
  
    // Fetch the data for the specific vehicle from your database
    const vehicleData = await item.findOne(vehicleId); // Replace with your actual query
  
    // Assuming you have a utility function for building the detail view
    const detailView = await utilities.buildItemDetailView(vehicleData); // Replace with your actual utility function
  
    let nav = await utilities.getNav();
  
    res.render("./inventory/item-detail", {
      title: "Vehicle Detail",
      nav,
      detailView,
    });
  };
  
  module.exports = itemDetailController;

