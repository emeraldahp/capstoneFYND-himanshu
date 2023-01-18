const User = require('../models/User')

const userLogin = async (req, res, next) => {
    const credentials = req.body
    const {userName, password} = credentials
    const check = await User.findOne({userName})
    if(check === null){
        console.log("No user found")
    }
    else{
        if(check.password==password)
            console.log("user:", userName, "loginSuccess")
        else
            console.log("wrong password")
    }
}

module.exports = {
    userLogin
}