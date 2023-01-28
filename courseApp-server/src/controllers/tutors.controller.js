const Tutor = require('../models/Tutor')

const tutorLogin = async (req, res, next) => {
    const credentials = req.body
    const {tutorName, password} = credentials
    try { 
        const check = await Tutor.findOne({tutorName})
        let info = {
            status: "",
            tutorName: ""
        }
        console.log("check", check, "req", req.body)
        if(check === null){
            info.status = "No tutor found"
        }
        else{
            if(check.password==password) {
                info.status = "loginsuccess"
                info.tutorName = tutorName
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

module.exports = {
    tutorLogin
}