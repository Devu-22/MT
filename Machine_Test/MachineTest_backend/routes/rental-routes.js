const express = require('express');
const router = express.Router();
const rentalController = require('../controller/rental-controller');

router.post('/', rentalController.createRental);
router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.patch('/:id', rentalController.updateRental);
router.delete('/:id', rentalController.deleteRental);
router.patch('/return/:id', rentalController.returnBook);
router.post('/fine/:id', rentalController.generateFine);

module.exports = router;