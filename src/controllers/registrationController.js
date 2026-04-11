const database = require('../config/db');
const ObjectId = require('mongodb').ObjectId; // id from database
const { validationResult } = require('express-validator');

// GET ALL REGISTRATIONS
const getAllRegistrations = async (req, res, next) => {
    //#swagger.tags=['registrations']
    try {
        const result = await database.getDb().db().collection('registrations').find();
        result.toArray().then((registrations) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(registrations);
        });
    } catch (error) {
        next(error);
    }
};

// GET one EVENT
const getOneRegistration = async (req, res, next) => {
    //#swagger.tags=['registrations']
    try {
        const registrationId = new ObjectId(req.params.id);
        const result = await database.getDb().db().collection('registrations').find({ _id: registrationId });
        result.toArray().then((registrations) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(registrations[0]);
        });
    } catch (error) {
        next(error);
    }
}

// POST --- CREATE AN REGISTRATION 
const createRegistration = async (req, res, next) => {
    //#swagger.tags=['registrations']

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const registration = {
            userId: req.body.userId,
            eventId: req.body.eventId,
            registeredAt: req.body.registeredAt,
        };

        const response = await database.getDb().db().collection('registrations').insertOne(registration);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we created the registration');
        }
    } catch (error) {
        next(error);
    }
};


// PUT --- REGISTRATION
const updateRegistration = async (req, res, next) => {
    //#swagger.tags=['registrations']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const registrationId = new ObjectId(req.params.id);
        const registration = {
            userId: req.body.userId,
            eventId: req.body.eventId,
            registeredAt: req.body.registeredAt,
        }
        const response = await database.getDb().db().collection('registrations').replaceOne({ _id: registrationId }, registration);
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred util we update the registration');
        }
    } catch (error) {
        next(error);
    }

}

// DELETE REGISTRATION BY ID
const deleteRegistration = async (req, res, next) => {
    //#swagger.tags=['registrations']
    try {
        const registrationId = new ObjectId(req.params.id);
        const response = await database.getDb().db().collection('registrations').deleteOne({ _id: registrationId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we delete the registration');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllRegistrations, getOneRegistration, createRegistration, updateRegistration, deleteRegistration };