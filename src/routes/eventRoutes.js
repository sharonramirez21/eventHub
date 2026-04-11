const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();
const { validateEvent } = require('../validations/eventValidation');
const {isAuthenticated} = require('../middleware/authenticate')


router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getOneEvent)
router.post('/', isAuthenticated, validateEvent, eventController.createEvent);
router.put('/:id',isAuthenticated, validateEvent, eventController.updateEvent);
router.delete('/:id',isAuthenticated, eventController.deleteEvent);

module.exports = router;