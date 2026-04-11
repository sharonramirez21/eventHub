const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const { validateUser } = require('../validations/userValidation');
const { isAdmin } = require("../middleware/authorizationMiddleware");

router.get('/', isAdmin, userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;