const IncomeSchema = require('../models/incomeModel')
const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')
const User = require('../models/userModel')
const mongoose = require("mongoose")

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

    await User.findOneAndUpdate({
        _id: req.auth_user.static_id
    }, {
        "$push": {
            "incomes": {
                income_id: incomeAdd._id
            }
        }
    })

    res.status(201).json(incomeAdd);
})

const getIncomes = asyncWrapper(async (req, res) => {
    const query_arr = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(`${req.auth_user.static_id}`)
            }
        },
        {
            $unwind: {
                path: "$incomes",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "incomes",
                localField: "incomes.income_id",
                foreignField: "_id",
                as: "incomes"
            }
        },
        {
            $unwind: {
                path: "$incomes",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                incomes: {
                    $push: "$incomes"
                }
            }
        }
    ];

    const user_details = await User.aggregate(query_arr);
    res.status(200).json({ message: "Incomes Array Fetched Successfully", data: user_details[0].incomes })
})

const deleteIncome = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user_id = req.auth_user.static_id;


    const deletedIncome = await User.findOneAndUpdate({
        _id: user_id
    }, {
        "$pull": {
            "incomes": {
                income_id: id
            }
        }
    },
        { new: true })

    if (!deletedIncome) {
        return res.status(404).json({ message: "User has no such income with id" });
    }

    res.status(200).json({ message: "Income deleted successfully", data: deletedIncome.incomes })
})

const updateIncome = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const user_details = await User.findOne({ _id: req.auth_user.static_id });

    console.log(user_details);

    const found = user_details?.incomes.filter(income => (income.income_id.equals(id)))
    if (!found.length) return res.json({ message: "User has no such income with id" })
    const updIncome = await IncomeSchema.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    )
    if (!updIncome) {
        return (createCustomError(`No income with id ${id}`, 404))
    }
    res.status(200).json({ message: "Income Edited Successfully" })
})

const getIncomeByMonth = asyncWrapper(async (req, res) => {
    const query_arr = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(`${req.auth_user.static_id}`)
            }
        },
        {
            $unwind: {
                path: "$incomes",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "incomes",
                localField: "incomes.income_id",
                foreignField: "_id",
                as: "incomes"
            }
        },
        {
            $unwind: {
                path: "$incomes",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                incomes: {
                    $push: "$incomes"
                }
            }
        }
    ];

    const user_details = await User.aggregate(query_arr);
    const incomes_arr = user_details[0].incomes

    const { year } = req.query;

    const monthIncomes = new Array(12).fill(0)

    const incomes = incomes_arr.filter((income) => {
        return income.date.getFullYear() === parseInt(year)
    })

    if (incomes.length === 0) {
        return res.status(200).json({});
    }

    incomes.forEach((income) => {
        const month = income.date.getMonth()
        monthIncomes[month] += income.amount
    })

    res.status(200).json(monthIncomes);
})

module.exports = {
    addIncome,
    getIncomes,
    deleteIncome,
    updateIncome,
    getIncomeByMonth
}
