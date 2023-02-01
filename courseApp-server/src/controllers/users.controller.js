const User = require('../models/User')
const jwt = require('jsonwebtoken')

const userLogin = async (req, res, next) => {
    const credentials = req.body
    const {userName, password} = credentials
    try {
        const check = await User.findOne({userName})
        let info = {
            status: "",
            userName: "",
            token: ""
        }
        console.log("check", check, "req", req.body)
        if(check === null){
            info.status = "No user found"
            res.status(201).json({status: 'success', data:info})
        }
        else{
            const isMatch = await check.checkPassword(password);
            if(isMatch) {
                const claims = {
                    name: check.userName,
                    role: "user"
                };
                jwt.sign(claims, process.env.JWT_SECRET, function (error, token) {
                    // some problem in generating JWT
                    if (error) {
                        res.status(500).json({status: 'Internal Server Error', data:error})
                    }

                    info.status = "loginsuccess"
                    info.userName = check.userName
                    info.token = token
                    res.status(201).json({status: 'success', data:info})
                });
            }
            else {
                info.status = "wrong password"
                res.status(201).json({status: 'success', data:info})
            }
        }
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