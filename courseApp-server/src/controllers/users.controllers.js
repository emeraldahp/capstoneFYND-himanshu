const User = require('../models/User')

const userLogin = async (req, res, next) => {
    const credentials = req.body
    const {userName, password} = credentials
    const check = await User.findOne({userName})
    let info = {
        status: "",
        userName: ""
    }
    console.log("check", check, "req", req.body)
    if(check === null){
        info.status = "No user found"
    }
    else{
        if(check.password==password) {
            info.status = "loginsuccess"
            info.userName = userName
        }
        else
            info.status = "wrong password"
    }
    console.log(info)
    res.status(201).json({status: 'success', data:info})
}

module.exports = {
    userLogin
}