const Expense = require('../models/Expense');

function calculateDates(initialDate, qtdeInstallment = 1) {
  const dates = [];
  const start = new Date(initialDate);

  for (let i = 0; i < qtdeInstallment; i++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  return dates;
}

exports.saveExpense = async (model) => {
  const initialDate = model.date;
  const qtdeInstallment = model.qtdeInstallment;

  const amount = parseFloat(
    model.amount.toString().replace('.', '').replace(',', '.')
  );

  const dates = calculateDates(initialDate, qtdeInstallment);
  const installmentAmount = qtdeInstallment > 1
    ? amount / qtdeInstallment
    : amount;

  const firstExpense = new Expense({
    description: model.description,
    category: model.category,
    amount: installmentAmount,
    date: dates[0],
    qtdeInstallment,
    installmentNumber: 1,
    parentId: null
  });

  const savedFirst = await firstExpense.save();
  const parentId = savedFirst._id;

  for (let i = 1; i < dates.length; i++) {
    const installment = new Expense({
      description: model.description,
      category: model.category,
      amount: installmentAmount,
      date: new Date(dates[i]),
      qtdeInstallment,
      installmentNumber: i + 1,
      parentId
    });

    await installment.save();
  }
};

exports.updateById = async (id, data) => {
  if (!data) {
    throw new Error('Dados para atualização ausentes');
  }

  if (data.isPaid === true) {
    data.datePaid = new Date();
  }

  const updated = await Expense.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });

  return updated;
};

exports.getAll = async () => {
  return Expense.find();
};

exports.getByMonth = async (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);

  return Expense.find({
    date: {
      $gte: start,
      $lte: end
    }
  }).sort({ date: 1 });
};

exports.deleteById = async (id) => {
  await Expense.findByIdAndDelete(id);
};
