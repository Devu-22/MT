const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const rentalSchema = new Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rentalDate: { type: Date, default: Date.now },
    dueDate: { type: Date, default: function() { return Date.now() + 10 * 24 * 60 * 60 * 1000; } },
    returnDate: { type: Date },
    fine: { type: mongoose.Schema.Types.ObjectId, ref: 'Fine' },
    isReturned: { type: Boolean, default: false },
    rentalStatus: { type: String, enum: ['active', 'returned', 'overdue'] }
  });
  
  module.exports = mongoose.model('Rental', rentalSchema);