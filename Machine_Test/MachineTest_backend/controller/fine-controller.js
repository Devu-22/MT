const Fine = require('../model/fine');
const Rental = require('../model/rental');



// Create fine
exports.createFine = async (req, res) => {
    try {
      const fine = new Fine(req.body);
      await fine.save();
      res.status(201).json(fine);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all fines
  exports.getAllFines = async (req, res) => {
    try {
      const fines = await Fine.find()
        .populate('rental');
      res.json(fines);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get fine by ID
  exports.getFineById = async (req, res) => {
    try {
      const id = req.params.id;
      const fine = await Fine.findById(id)
        .populate('rental');
      if (!fine) {
        return res.status(404).json({ message: 'Fine not found' });
      }
      res.json(fine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update fine
  exports.updateFine = async (req, res) => {
    try {
      const id = req.params.id;
      const fine = await Fine.findByIdAndUpdate(id, req.body, { new: true });
      if (!fine) {
        return res.status(404).json({ message: 'Fine not found' });
      }
      res.json(fine);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete fine
  exports.deleteFine = async (req, res) => {
    try {
      const id = req.params.id;
      await Fine.findByIdAndRemove(id);
      res.status(204).json({ message: 'Fine deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Pay fine
  exports.payFine = async (req, res) => {
    try {
      const id = req.params.id;
      const fine = await Fine.findById(id);
      if (!fine) {
        return res.status(404).json({ message: 'Fine not found' });
      }
      fine.paymentStatus = true;
      fine.paymentDate = new Date();
      fine.fineStatus = 'paid';
      await fine.save();
      res.json(fine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };