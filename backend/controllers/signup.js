const asyncWrapper = require("../middlewares/async");
const signUpSchema = require('../models/signUpModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "asdfgh"

const signUp = asyncWrapper(async (req, res) => {
    const { username, email, password: plaintextpassword } = req.body
    const password = await bcrypt.hash(plaintextpassword, 10)
    const User = await signUpSchema.create({ username, email, password })

    const token = jwt.sign({
        username: username,
        email: email,
        id: User._id
    }, JWT_SECRET)
    res.json({ User, token })
})

const login = asyncWrapper(async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    const User = await signUpSchema.find({username})
    console.log(User[0].password)
    const validatePassword = await bcrypt.compare(password, User[0]?.password)
    console.log(validatePassword)
    if(!validatePassword) {
        return res.status(404).json({msg: "Invalid credentials"})
    }

    const token = jwt.sign({
        username: username,
        email: User.email,
        id: User._id
    }, JWT_SECRET)

    res.status(200).json({User, token})
})

module.exports = {
    signUp,
    login
}
