const asyncWrapper = require("../middlewares/async");
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "asdfgh"

const signUp = asyncWrapper(async (req, res) => {
    const { username, email, password: plaintextpassword } = req.body
    const password = await bcrypt.hash(plaintextpassword, 10)
    const user = await User.create({ username, email, password })

    const token = jwt.sign({
        username: username,
        email: email,
        id: user._id
    }, JWT_SECRET)
    res.json({ user, token })
})

const login = asyncWrapper(async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    const user = await User.find({username})
    const validatePassword = await bcrypt.compare(password, User[0]?.password)
    if(!validatePassword) {
        return res.status(404).json({msg: "Invalid credentials"})
    }

    const token = jwt.sign({
        username: username,
        email: User.email,
        id: User._id
    }, JWT_SECRET)

    res.status(200).json({user, token})
})

module.exports = {
    signUp,
    login
}
