// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

// Route for the path that will be sent when the "My Account" link is clicked
// Adding error handler middleware to the route to deal with any errors
router.get("/:accountId", async (req, res, next) => {
    try {
        // Call the account controller function
        await accountController.buildLogin(req, res);
    } catch (error) {
        // Pass any errors to the next middleware (error handler)
        next(error);
    }
});

module.exports = router;