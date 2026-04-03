const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const { validateUser } = require('../validations/userValidation');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;