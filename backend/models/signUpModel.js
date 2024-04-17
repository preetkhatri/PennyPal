const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('signUpSchema', signUpSchema)
