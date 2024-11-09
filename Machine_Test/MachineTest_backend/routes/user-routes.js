const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');


// User Routes
router.post('/signup', userController.signup);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.get('/email/:email', userController.getUserByEmail);
// router.patch('/:id', userController.updateUser);
// router.patch('/email/:email', userController.updateUserByEmail);
// router.delete('/:id', userController.deleteUserById);
// router.delete('/email/:email', userController.deleteUserByEmail);
router.post('/login', userController.login);

module.exports = router;