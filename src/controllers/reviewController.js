const database = require('../config/db');
const ObjectId = require('mongodb').ObjectId; // id from database
const { validationResult } = require('express-validator');

// GET ALL REVIEWS
const getAllReviews = async (req, res, next) => {
    //#swagger.tags=['reviews']
    try {
        const result = await database.getDb().db().collection('reviews').find();
        result.toArray().then((reviews) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(reviews);
        });
    } catch (error) {
        next(error);
    }
};

// GET one REVIEW
const getOneReview = async (req, res, next) => {
    //#swagger.tags=['reviews']
    try {
        const reviewId = new ObjectId(req.params.id);
        const result = await database.getDb().db().collection('reviews').find({ _id: reviewId });
        result.toArray().then((reviews) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(reviews[0]);
        });
    } catch (error) {
        next(error);
    }
}

// POST --- CREATE AN REVIEW 
const createReview = async (req, res, next) => {
    //#swagger.tags=['reviews']

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const review = {
            userId: req.body.userId,
            eventId: req.body.eventId,
            rating: req.body.rating,
            comment: req.body.comment,
            createdAt: req.body.createdAt
        };

        const response = await database.getDb().db().collection('reviews').insertOne(review);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we created the review');
        }
    } catch (error) {
        next(error);
    }
};

// PUT --- review
const updateReview = async (req, res, next) => {
    //#swagger.tags=['reviews']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const reviewId = new ObjectId(req.params.id);
        const review = {
            userId: req.body.userId,
            eventId: req.body.eventId,
            rating: req.body.rating,
            comment: req.body.comment,
            createdAt: req.body.createdAt
        };
        const response = await database.getDb().db().collection('reviews').replaceOne({ _id: reviewId }, review);
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred util we update the review');
        }
    } catch (error) {
        next(error);
    }

}

// DELETE REVIEW BY ID
const deleteReview = async (req, res, next) => {
    //#swagger.tags=['reviews']
    try {
        const reviewId = new ObjectId(req.params.id);
        const response = await database.getDb().db().collection('reviews').deleteOne({ _id: reviewId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we delete the review');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllReviews, getOneReview, createReview, updateReview, deleteReview };