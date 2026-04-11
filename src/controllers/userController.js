const database = require('../config/db');
const ObjectId = require('mongodb').ObjectId; // id from database
const { validationResult } = require('express-validator');

// GET ALL USERS
const getAllUsers = async (req, res, next) => {
    //#swagger.tags=['users']
    try {
        const result = await database.getDb().db().collection('users').find();
        result.toArray().then((users) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(users);
        });
    } catch (error) {
        next(error);
    }
};

// GET one USER
const getOneUser = async (req, res, next) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await database.getDb().db().collection('users').find({ _id: userId });
        result.toArray().then((users) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (error) {
        next(error);
    }
}

// POST --- CREATE USER 
const createUser = async (req, res, next) => {
    //#swagger.tags=['users']

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = {
            googleId: req.body.googleId,
            githubId: req.body.githubId,
            name: req.body.name,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            createdAt: req.body.createdAt
        };

        const response = await database.getDb().db().collection('reviews').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we created the user');
        }
    } catch (error) {
        next(error);
    }
};

// PUT --- USER
const updateUser = async (req, res, next) => {
    //#swagger.tags=['users']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            googleId: req.body.googleId,
            githubId: req.body.githubId,
            name: req.body.name,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
            createdAt: req.body.createdAt
        }
        const response = await database.getDb().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred util we update the user');
        }
    } catch (error) {
        next(error);
    }

}

// DELETE USERS BY ID
const deleteUser = async (req, res, next) => {
    //#swagger.tags=['users']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await database.getDb().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we delete the user');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getOneUser, createUser ,updateUser, deleteUser };