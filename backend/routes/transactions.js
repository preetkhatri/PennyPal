const express = require('express')
const router = express.Router()


const { addIncome, getIncomes, deleteIncome, updateIncome, getIncomeByMonth } = require('../controllers/income')
const { addExpense, getExpenses, deleteExpense, updateExpense, getExpenseByMonth } = require('../controllers/expense')
const { signUp, login } = require('../controllers/signup')
const { authenticateUser } = require('../middlewares/auth')

router.post('/add-income', authenticateUser, addIncome)
router.get('/get-incomes', authenticateUser, getIncomes).get('/get-incomes-by-year', getIncomeByMonth)
router.delete('/delete-income/:id', deleteIncome)
router.patch('/update-income/:id',authenticateUser, updateIncome)

router.post('/add-expense', addExpense)
router.get('/get-expenses', authenticateUser, getExpenses).get('/get-expenses-by-year', getExpenseByMonth)
router.delete('/delete-expense/:id', deleteExpense)
router.patch('/update-expense/:id', updateExpense)

router.post('/signup', signUp)
router.get('/login',login)

module.exports = router