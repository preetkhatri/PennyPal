const IncomeSchema = require('../models/incomeModel')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')

const addIncome = asyncWrapper(async (req, res) => {
    const { title, amount, date, category, description } = req.body
    const income = IncomeSchema({ title, amount, date, category, description })

    if (!title || !amount || !category || !description || !date) {
        return next(createCustomError(`All fields are required`, 400))
    }
    if (amount < 0 || !amount === 'Number') {
        next(createCustomError(`Amount must be positive`, 400))
    }

    const incomeAdd = await IncomeSchema.create(income);
    res.status(201).json(incomeAdd);
})

const getIncomes = asyncWrapper(async (req, res) => {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 })
    return res.status(200).json(incomes)
})

const deleteIncome = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const delIncome = await IncomeSchema.findOneAndDelete({ _id: id })
    if (!delIncome) {
        return next(createCustomError(`No income with id: ${id}`, 404));
    }
    res.status(200).json({ delIncome })
})

const updateIncome = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const updIncome = await IncomeSchema.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    )
    if (!updIncome) {
        return next(createCustomError(`No income with id ${id}`, 404))
    }
    res.status(200).json({ updIncome })
})

module.exports = {
    addIncome,
    getIncomes,
    deleteIncome,
    updateIncome
}
