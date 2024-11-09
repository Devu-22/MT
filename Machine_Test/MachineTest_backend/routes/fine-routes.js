// routes/fineRoutes.js
const express = require('express');
const router = express.Router();
const fineController = require('../controller/fine-controller');

// Fine Routes
router.post('/', fineController.createFine);
router.get('/', fineController.getAllFines);
router.get('/:id', fineController.getFineById);
router.patch('/:id', fineController.updateFine);
router.delete('/:id', fineController.deleteFine);
router.patch('/pay/:id', fineController.payFine);

module.exports = router;