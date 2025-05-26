const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.get('/', expenseController.getAllExpenses);
router.get('/month/:year/:month', expenseController.getByMonth);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
