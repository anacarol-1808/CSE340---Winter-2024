const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};
const classificationModel = require("../models/inventory-model");

/*  **********************************
 *  Add New Classification Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // classification name is required and must be a string
        body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a new classification name.") // on error this message is sent.
  
        // no spaces
        .custom(value => {
            if (/\s/.test(value)) {
                throw new Error('Classification name cannot contain spaces.');
            }
            return true;
        })

        // no special characters or numbers
        .custom(value => {
            if (!/^[a-zA-Z]+$/.test(value)) {
                throw new Error('Classification name can only contain letters.');
            }
            return true;
        })
    ];
};

module.exports = validate
