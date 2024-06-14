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
  // Get or create the nav variable
  let nav = await utilities.getNav();
  // Implement logic to render the add new classification view
  res.render("./inventory/add-classification", { 
    title: "Add New Classification",
    nav, 
  });
};

// Controller function for adding a new classification 
invCont.addClassification = async function (req, res, next) {
  try {
    // Extract data from the request body
    const { classification_name } = req.body;

    // Perform server-side validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Add logic to insert into the database using the model
    await invModel.addNewClassification(classification_name);

    // Redirect or respond as needed
    res.redirect('/'); // Can be redirected to the home page or another relevant page
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


/* ***************************
 *  Render add new inventory view
 * ************************** */
invCont.renderAddInventory = async function (req, res, next) {
  // Get or create the nav variable
  let nav = await utilities.getNav();
  // Implement logic to render the add new inventory view
  res.render("./inventory/add-inventory", { 
    title: "Add New Inventory",
  nav,
  });
};

// Export individual controllers
module.exports = invCont;