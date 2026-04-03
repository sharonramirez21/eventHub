const express = require('express');
const registrationController = require('../controllers/registrationController');
const router = express.Router();
const { validateRegistration } = require('../validations/registrationValidation');

router.get('/', registrationController.getAllRegistrations);
router.get('/:id', registrationController.getOneRegistration);
router.post('/', validateRegistration ,registrationController.createRegistration);
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;