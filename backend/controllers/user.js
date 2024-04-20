const asyncWrapper = require('../middlewares/async')
const User = require('../models/userModel')

const getUserDetails = asyncWrapper(async (req,res) => {
    const user = await User.findOne(req.auth_user.static_id);

    if(!user) {
        return res.status(404).json({message: "User not Found"})
    }

    res.status(200).json({username: user.username})
})

module.exports = getUserDetails

