const Rental = require('../model/rental');
const Book = require('../model/book');
const User = require('../model/user');
const Fine = require('../model/fine');


// Create rental
exports.createRental = async (req, res) => {
    try {
      const rental = new Rental(req.body);
      await rental.save();
      res.status(201).json(rental);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all rentals
  exports.getAllRentals = async (req, res) => {
    try {
      const rentals = await Rental.find()
        .populate('book')
        .populate('user')
        .populate('fine');
      res.json(rentals);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get rental by ID
  exports.getRentalById = async (req, res) => {
    try {
      const id = req.params.id;
      const rental = await Rental.findById(id)
        .populate('book')
        .populate('user')
        .populate('fine');
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.json(rental);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update rental
  exports.updateRental = async (req, res) => {
    try {
      const id = req.params.id;
      const rental = await Rental.findByIdAndUpdate(id, req.body, { new: true });
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.json(rental);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete rental
  exports.deleteRental = async (req, res) => {
    try {
      const id = req.params.id;
      await Rental.findByIdAndRemove(id);
      res.status(204).json({ message: 'Rental deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Return book
  exports.returnBook = async (req, res) => {
    try {
      const id = req.params.id;
      const rental = await Rental.findById(id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      rental.isReturned = true;
      rental.returnDate = Date.now();
      rental.rentalStatus = 'returned';
      await rental.save();
      res.json(rental);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Generate fine
  exports.generateFine = async (req, res) => {
    try {
      const id = req.params.id;
      const rental = await Rental.findById(id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      const fine = new Fine({
        rental: rental._id,
        amount: 10,
        paymentStatus: false,
        fineStatus: 'pending',
      });
      await fine.save();
      rental.fine = fine._id;
      await rental.save();
      res.json(fine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  