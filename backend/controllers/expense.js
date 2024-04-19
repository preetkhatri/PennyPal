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

    console.log("req: ", req.auth_user);
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
        { new: true }
    )
    if (!updExpense) {
        return next(createCustomError(`No expense with id ${id}`, 404))
    }
    res.status(200).json({ updExpense })
})

const getExpenseByMonth = asyncWrapper(async (req, res) => {
    const { year } = req.query;
    console.log(req.query);

    const monthExpenses = new Array(12).fill(0);

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const expenses = await ExpenseSchema.find({
        date: { $gte: startDate, $lte: endDate }
    }).sort({date: 1});

    if (expenses.length === 0) {
        return res.status(200).json({});
    }

    expenses.forEach((expense)=>{
        const month = expense.date.getMonth();
        monthExpenses[month] += expense.amount
    })

    res.status(200).json(monthExpenses);
})

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getExpenseByMonth
}
