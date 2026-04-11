const express = require('express');
const registrationController = require('../controllers/registrationController');
const router = express.Router();
const { validateRegistration } = require('../validations/registrationValidation');
const {isAuthenticated} = require('../middleware/authenticate')


router.get('/', registrationController.getAllRegistrations);
router.get('/:id', registrationController.getOneRegistration);
router.post('/', isAuthenticated, validateRegistration ,registrationController.createRegistration);
router.delete('/:id',isAuthenticated,  registrationController.deleteRegistration);

module.exports = router;