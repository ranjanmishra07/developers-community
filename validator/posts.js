const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validatePostInput(data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : "";
    if (!Validator.isLength(data.text, { min: 10, max: 3000 })) {
        errors.text = "length must be between 2 to 300 characters"
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = "text field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
