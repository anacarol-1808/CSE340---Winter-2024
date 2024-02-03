// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const itemDetailController = require("../controllers/itemDetailController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to deliver a specific inventory item detail view
router.get("/detail/:inv_id", invController.showItemDetail);

module.exports = router;