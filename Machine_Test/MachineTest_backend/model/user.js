const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membershipPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan' },
    // rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }],
    // fines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fine' }],
    password: { type: String, required: true }
  });
  
module.exports = mongoose.model('User', userSchema);