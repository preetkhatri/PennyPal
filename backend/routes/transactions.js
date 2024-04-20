const express = require('express')
const router = express.Router()
const { signUp, login } = require('../controllers/auth')
const { authenticateUser } = require('../middlewares/auth')


const { addIncome, getIncomes, deleteIncome, updateIncome, getIncomeByMonth } = require('../controllers/income')
const { addExpense, getExpenses, deleteExpense, updateExpense, getExpenseByMonth } = require('../controllers/expense')
const getUserDetails = require('../controllers/user')

router.post('/add-income', authenticateUser, addIncome)
router.get('/get-incomes', authenticateUser, getIncomes).get('/get-incomes-by-year', authenticateUser, getIncomeByMonth)
router.delete('/delete-income/:id', authenticateUser, deleteIncome)
router.patch('/update-income/:id',authenticateUser, updateIncome)

router.post('/add-expense', authenticateUser, addExpense)
router.get('/get-expenses', authenticateUser, getExpenses).get('/get-expenses-by-year', authenticateUser, getExpenseByMonth)
router.delete('/delete-expense/:id', authenticateUser, deleteExpense)
router.patch('/update-expense/:id', authenticateUser, updateExpense)

router.post('/signup', signUp)
router.post('/login',login)

router.get('/userdetails', authenticateUser, getUserDetails)

module.exports = router