const express = require('express');
const router = express.Router();

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Intentional error route
router.get('/intentional-error', (req, res, next) => {
    // Trigger an intentional error
    throw new Error('This is an intentional error for Task 3.');
  });

module.exports = router;



