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
            const isMatch = await check.checkPassword(password);
            if(isMatch) {
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

const getTutorList = async (req, res, next) => {
    let tutorList = []
    try {
        const tutors = await Tutor.find({}) 
        tutors.forEach(element => {
            tutorList.push(element.tutorName)
        })
        res.status(201).json({status: "success", data: tutorList})
    }
    catch(err) {
        res.status(201).json({status: "failed", data: err.message})

    }
}

const postTutor = async (req, res, next) => {
    data = req.body
    try {
        const tutorData = await Tutor.create(data)
        res.status(201).json({status: "success", data: tutorData})
    }
    catch(err) {
        res.status(201).json({status: "failed", data: err.message})
    }
}

module.exports = {
    tutorLogin,
    getTutorList,
    postTutor
}