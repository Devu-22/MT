const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fineSchema = new Schema({
    rental: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: Boolean, default: false },
    paymentDate: { type: Date },
    fineStatus: { type: String, enum: ['pending', 'paid'] }
  });
  
  module.exports = mongoose.model('Fine', fineSchema);