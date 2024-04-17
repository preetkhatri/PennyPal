const ExpenseSchema = require('../models/expenseModel')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')

const addExpense = asyncWrapper(async (req, res) => {
    const { title, amount, date, category, description } = req.body
    const expense = ExpenseSchema({ title, amount, date, category, description })

    if (!title || !amount || !category || !description || !date) {
        (createCustomError(`All fields are required`, 400))
    }
    if (amount < 0 || !amount === 'Number') {
        (createCustomError(`Amount must be positive`, 400))
    }

    const expenseAdd = await ExpenseSchema.create(expense);
    res.status(201).json(expenseAdd);
})

const getExpenses = asyncWrapper(async (req, res) => {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 })
    return res.status(200).json(expenses)
})

const deleteExpense = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const delExpense = await ExpenseSchema.findOneAndDelete({ _id: id })
    if (!delExpense) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }
    res.status(200).json({ delExpense })
})

const updateExpense = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const updExpense = await ExpenseSchema.findOneAndUpdate(
        { _id: id },
        req.body,
        {new:true}
    )
    res.status(200).json({updExpense})
})

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}
