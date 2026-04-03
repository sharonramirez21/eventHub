const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();
const { validateEvent } = require('../validations/eventValidation');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getOneEvent)
router.post('/', validateEvent, eventController.createEvent);
router.put('/:id', validateEvent, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;