const User = require('../models/User')

const userLogin = async (req, res, next) => {
    const credentials = req.body
    const {userName, password} = credentials
    try {
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
    catch(err) {
        res.status(201).json({status: 'failed', data:err.message})
    }
}

const getUserList = async (req, res, next) => {
    let userList = []
    try {
        const users = await User.find({}) 
        users.forEach(element => {
            userList.push(element.userName)
        })
        res.status(201).json({status: "success", data: userList})
    }
    catch(err) {
        res.status(201).json({status: "failed", data: err.message})
    }
}

const postUser = async (req, res, next) => {
    data = req.body
    try {
        const userData = await User.create(data)
        res.status(201).json({status: "success", data: userData})
    }
    catch(err) {
        res.status(201).json({status: "failed", data: err.message})
    }
}


module.exports = {
    userLogin,
    getUserList,
    postUser
}