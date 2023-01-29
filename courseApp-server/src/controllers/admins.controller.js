const Admin = require('../models/Admin')

const adminLogin = async (req, res, next) => {
    const credentials = req.body
    const {adminName, password} = credentials
    try{
        const check = await Admin.findOne({adminName})
        let info = {
            status: "",
            adminName: ""
        }
        console.log("check", check, "req", req.body)
        if(check === null){
            info.status = "No admin found"
        }
        else{
            if(check.password==password) {
                info.status = "loginsuccess"
                info.adminName = adminName
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