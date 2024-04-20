const asyncWrapper = require("../middlewares/async");
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticateUser = require('../middlewares/auth');
const { createCustomError } = require("../errors/custom-error");

const signUp = asyncWrapper(async (req, res) => {
    const { username, email, password: plaintextpassword } = req.body

    const user_exist = await User.findOne({email: email});

    if(user_exist) return res.status(403).json({message: "User Already Exists"});

    const password = await bcrypt.hash(plaintextpassword, 10)
    const user = await User.create({ username, email, password })

    const token = jwt.sign({
        id: user._id,
        email: email,
        username: username
    }, process.env.JWT_SECRET)

    res.json({ message: "User Created Successfully", data: token })
})

const login = asyncWrapper(async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    if(!user) return res.status(404).json({message: "No Such User Exists"});
    const validatePassword = bcrypt.compare(password, user.password)
    if(!validatePassword) {
        return res.status(404).json({message: "Invalid credentials"})
    }

    const token = jwt.sign({
        id: user._id,
        email: User.email,
        username: username
    }, process.env.JWT_SECRET)

    res.status(200).json({message: "User Logged in Successfully", data: token })
})

module.exports = {
    signUp,
    login
}
