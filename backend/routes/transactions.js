const express = require('express')
const router = express.Router()

const { addIncome, getIncomes, deleteIncome, updateIncome, incomeByYear } = require('../controllers/income')
const { addExpense, getExpenses, deleteExpense, updateExpense, getExpenseByYear } = require('../controllers/expense')

router.post('/add-income', addIncome)
router.get('/get-incomes', getIncomes).get('/get-incomes-by-year', incomeByYear)
router.delete('/delete-income/:id', deleteIncome)
router.patch('/update-income/:id', updateIncome)

router.post('/add-expense', addExpense)
router.get('/get-expenses', getExpenses).get('/get-expenses-by-year', getExpenseByYear)
router.delete('/delete-expense/:id', deleteExpense)
router.patch('/update-expense/:id', updateExpense)

module.exports = router