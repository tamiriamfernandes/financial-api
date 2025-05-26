const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  qtdeInstallment: { type: Number, required: true },
  installmentNumber: { type: Number, required: true },
  installmentNumber: { type: Number, required: true },
  installmentNumber: { type: Number, required: true },
  isPaid: { type: Boolean },
  datePaid: { type: Date },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense', default: null }
});

ExpenseSchema.virtual('installment').get(function () {
  return this.qtdeInstallment === 1 ? 'Único' : 'Parcelado';
});

ExpenseSchema.set('toJSON', { virtuals: true });
ExpenseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
