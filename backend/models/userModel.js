const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [
        {
            expense_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "expenses"
            }
        }
    ],
    incomes: [
        {
            income_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "incomes"
            }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
