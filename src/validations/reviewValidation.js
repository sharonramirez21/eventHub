const { body } = require('express-validator');

const validateReview = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required"),

    body("eventId")
        .notEmpty()
        .withMessage("Event ID is required"),

    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .notEmpty()
        .withMessage("Comment is required")
];

module.exports= { validateReview };