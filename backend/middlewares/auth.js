const User = require('../models/userModel')
const createCustomError = require('../errors/custom-error')
const jwt = require("jsonwebtoken")
const asyncWrapper = require('../middlewares/async')

const authenticateUser = asyncWrapper(async (req, res, next) => {
    const token = (req.headers.authorization.split("Bearer "))[1];
    const user_data = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne(
        {_id: user_data.id},
        {_id: 1, username: 1, email: 1}
    );
    
    if(!user) {
        createCustomError(`Not correct credentials`, 403);
    }

    req.auth_user = {
        static_id: user._id,
        username: user.username,
        email: user.email,
    };
    
    next();
})

module.exports = {
    authenticateUser
}
