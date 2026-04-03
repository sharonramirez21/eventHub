const { body } = require('express-validator');

const validateEvent = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),

    body("date")
        .isISO8601()
        .withMessage("Date must be a valid date"),

    body("location")
        .notEmpty()
        .withMessage("Location is required"),

    body("capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be a number"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image must be a valid URL")
];

module.exports = { validateEvent };