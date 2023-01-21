const User = require('../models/User')

const userLogin = async (req, res, next) => {
    const credentials = req.body
    const {username, password} = credentials
    const check = await User.findOne({username})
    let status = ""
    if(check === null){
        status = "No user found"
    }
    else{
        if(check.password==password)
            status = "user:"+username+"loginSuccess"
        else
            status = "wrong password"
    }
    console.log(status)
    res.status(201).json({status: 'success', data:status})
}

module.exports = {
    userLogin
}