const { body } = require('express-validator');

const validateRegistration = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required"),

    body("eventId")
        .notEmpty()
        .withMessage("Event ID is required"),
];

module.exports = { validateRegistration };