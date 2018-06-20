const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
        errors.handle = "length must be between 2 to 20 characters"
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "handle cant be empty"
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "status cant be empty"
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "cant be empty"
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "invalid website"
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = "invalid website"
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = "invalid linedin website"
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = "invalid facebook url"
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = "invalid twitter url"
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = "invalid instagram url"
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};
