const express = require('express')
const router = express.Router()

const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income')
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expense')

router.post('/add-income', addIncome)
router.get('/get-incomes', getIncomes)
router.delete('/delete-income/:id', deleteIncome)
router.patch('/update-income/:id', updateIncome)

router.post('/add-expense', addExpense)
router.get('/get-expenses', getExpenses)
router.delete('/delete-expense/:id', deleteExpense)
router.patch('/update-expense/:id', updateExpense)

module.exports = router