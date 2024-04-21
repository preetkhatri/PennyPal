const ExpenseSchema = require('../models/expenseModel')
const asyncWrapper = require('../middlewares/async')
const User = require('../models/userModel')
const { createCustomError } = require('../errors/custom-error')
const mongoose = require('mongoose')

const addExpense = asyncWrapper(async (req, res) => {
    const { title, amount, date, category, description } = req.body
    const expense = ExpenseSchema({ title, amount, date, category, description })

    if (!title || !amount || !category || !description || !date) {
        (createCustomError(`All fields are required`, 400))
    }
    if (amount < 0 || !typeof(amount) === Number) {
        (createCustomError(`Amount must be positive`, 400))
    }

    const expenseAdd = await ExpenseSchema.create(expense);

    await User.findOneAndUpdate({
        _id: req.auth_user.static_id
    }, {
        "$push": {
            "expenses": {
                expense_id: expenseAdd._id
            }
        }
    })


    res.status(201).json(expenseAdd);
})

const getExpenses = asyncWrapper(async (req, res) => {
    const query_arr = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(`${req.auth_user.static_id}`)
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "expenses",
                localField: "expenses.expense_id",
                foreignField: "_id",
                as: "expenses"
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                expenses: {
                    $push: "$expenses"
                }
            }
        }
    ];

    const user_details = await User.aggregate(query_arr);

    res.status(200).json({ message: "Expenses fetched successfully", data: user_details[0].expenses })
})

const deleteExpense = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user_id = req.auth_user.static_id;

    const deletedExpense = await User.findOneAndUpdate({
        _id: user_id
    }, {
        "$pull": {
            "expenses": {
                expense_id: id
            }
        }
    },
        { new: true })

    if (!deletedExpense) {
        return res.status(404).json({ message: "User has no such expense with id" });
    }
    
    res.status(200).json({ message: "Expense deleted successfully", data: deletedExpense.expenses })
})

const updateExpense = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user_details = await User.findOne({ _id: req.auth_user.static_id });

    console.log(user_details);

    const found = user_details?.expenses.filter(expense => (expense.expense_id.equals(id)))
    if (!found.length) return res.json({ message: "User has no such income with id" })

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
    const query_arr = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(`${req.auth_user.static_id}`)
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "expenses",
                localField: "expenses.expense_id",
                foreignField: "_id",
                as: "expenses"
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                expenses: {
                    $push: "$expenses"
                }
            }
        }
    ];

    const user_details = await User.aggregate(query_arr);
    const expenses_arr = user_details[0].expenses


    const { year } = req.query;

    const monthExpenses = new Array(12).fill(0);

    const expenses = expenses_arr.filter((expense)=> {
        return expense.date.getFullYear() === parseInt(year)
    })

    if (expenses.length === 0) {
        return res.status(200).json({});
    }

    expenses.forEach((expense) => {
        const month = expense.date.getMonth();
        monthExpenses[month] += expense.amount
    })

    res.status(200).json(monthExpenses);
})

const expenseYears = asyncWrapper(async (req,res)=> {
    const query_arr = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(`${req.auth_user.static_id}`)
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "expenses",
                localField: "expenses.expense_id",
                foreignField: "_id",
                as: "expenses"
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                expenses: {
                    $push: "$expenses"
                }
            }
        }
    ];

    const user_details = await User.aggregate(query_arr);
    const expenses_arr = user_details[0].expenses

    const yearsSet = new Set();
    expenses_arr.forEach((expense)=>{
        const year = expense.date.getFullYear();
        yearsSet.add(year);
    })

    const yearsArray = Array.from(yearsSet).sort();

    res.status(200).json({data: yearsArray})

})

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getExpenseByMonth,
    expenseYears
}
