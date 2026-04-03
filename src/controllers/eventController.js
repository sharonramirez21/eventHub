const database = require('../config/db');
const ObjectId = require('mongodb').ObjectId; // id from database
const { validationResult } = require('express-validator');

// GET ALL EVENTS
const getAllEvents = async (req, res, next) => {
    //#swagger.tags=['events']
    try {
        const result = await database.getDb().db().collection('events').find();
        result.toArray().then((events) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(events);
        });
    } catch (error) {
        next(error);
    }
};

// GET one EVENT
const getOneEvent = async (req, res, next) => {
    //#swagger.tags=['events']
    try {
        const eventId = new ObjectId(req.params.id);
        const result = await database.getDb().db().collection('events').find({ _id: eventId });
        result.toArray().then((events) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(events[0]);
        });
    } catch (error) {
        next(error);
    }
}

// POST --- CREATE AN EVENT 
const createEvent = async (req, res, next) => {
    //#swagger.tags=['events']

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const event = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            capacity: req.body.capacity,
            organizer: req.body.organizer,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt
        };

        const response = await database.getDb().db().collection('events').insertOne(event);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we created the event');
        }
    } catch (error) {
        next(error);
    }
};

// PUT --- EVENT
const updateEvent = async (req, res, next) => {
    //#swagger.tags=['events']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const eventId = new ObjectId(req.params.id);
        const event = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            capacity: req.body.capacity,
            organizer: req.body.organizer,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt
        }
        const response = await database.getDb().db().collection('events').repleaceOne({ _id: eventId }, event);
        if (response.modifiedCounnt > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred util we update the event');
        }
    } catch (error) {
        next(error);
    }

}

// DELETE EVENTS BY ID
const deleteEvent = async (req, res, next) => {
    //#swagger.tags=['events']
    try {
        const eventId = new ObjectId(req.params.id);
        const response = await database.getDb().db().collection('events').deleteOne({ _id: eventId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error ocurred until we delete the event');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllEvents, getOneEvent, createEvent, updateEvent, deleteEvent };