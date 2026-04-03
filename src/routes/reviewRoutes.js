const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();
const { validateReview } = require('../validations/reviewValidation');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getOneReview);
router.post('/', validateReview, reviewController.createReview);
router.put('/:id', validateReview, reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;