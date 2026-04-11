const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();
const { validateReview } = require('../validations/reviewValidation');
const {isAuthenticated} = require('../middleware/authenticate')


router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getOneReview);
router.post('/', isAuthenticated, validateReview, reviewController.createReview);
router.put('/:id',isAuthenticated, validateReview, reviewController.updateReview);
router.delete('/:id',isAuthenticated, reviewController.deleteReview);

module.exports = router;