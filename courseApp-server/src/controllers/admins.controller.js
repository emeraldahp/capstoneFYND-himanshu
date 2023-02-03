const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

const adminLogin = async (req, res, next) => {
    const credentials = req.body
    const {adminName, password} = credentials
    try{
        const check = await Admin.findOne({adminName})
        let info = {
            status: "",
            adminName: "",
            token: "",
            verified: false
        }
      
        if(check === null){
            info.status = "No admin found"
            res.status(201).json({status: 'success', data:info})
        }
        else{
            const isMatch = await check.checkPassword(password);
            if(isMatch) {
                const claims = {
                    name: check.adminName,
                    role: "admin",
                    verified: check.verified
                };
                jwt.sign(claims, process.env.JWT_SECRET, function (error, token) {
                    // some problem in generating JWT
                    if (error) {
                        res.status(500).send("Internal Server Error")
                    }
                    info.status = "loginsuccess"
                    info.adminName = check.adminName
                    info.token = token
                    info.verified = check.verified
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

const getAdminList = async (req, res, next) => {
    let adminList = []
    try {
        const admins = await Admin.find({}) 
        admins.forEach(element => {
            adminList.push(element.adminName)
        })
        res.status(201).json({status: "success", data: adminList})
    }
    catch(err) {
        res.status(201).json({status: "failed", data: err.message})

    }
}

const postAdmin = async (req, res, next) => {
    data = req.body
    try {
        const adminData = await Admin.create(data)
        res.status(201).json({status: "success", data: adminData})
    }
    catch(err) {
        res.status(201).json({status: "failed", data: err.message})
    }
}

module.exports = {
    adminLogin,
    getAdminList,
    postAdmin
}