const { body } = require('express-validator');

const validateUser = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Email must be valid"),

    body("avatarUrl")
        .optional()
        .isURL()
        .withMessage("Avatar must be a valid URL")
];

module.exports ={ validateUser };