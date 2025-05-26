const expenseService = require('../services/expense.service');

exports.createExpense = async (req, res) => {
  try {
    await expenseService.saveExpense(req.body);
    res.status(201).json({ message: 'Despesa cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar despesa:', error.message);
    res.status(500).json({ error: 'Erro ao salvar despesas.' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await expenseService.updateById(id, req.body);

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Despesa não encontrada.' });
    }

    res.json({ message: 'Despesa atualizada com sucesso!', data: updatedExpense });
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar despesa.' });
  }
};


exports.getAllExpenses = async (req, res) => {
  const expenses = await expenseService.getAll();
  res.json(expenses);
};

exports.getByMonth = async (req, res) => {
  const { year, month } = req.params;

  try {
    const expenses = await expenseService.getByMonth(parseInt(year), parseInt(month));
    res.json(expenses);
  } catch (error) {
    console.error('Erro ao buscar despesas do mês:', error.message);
    res.status(500).json({ error: 'Erro ao buscar despesas do mês.' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await expenseService.deleteById(id);
    res.json({ message: 'Despesa excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar despesa:', error.message);
    res.status(500).json({ error: 'Erro ao deletar despesa.' });
  }
};
