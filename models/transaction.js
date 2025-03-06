const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['income', 'expense'] },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, default: '' } // Optional field
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
