const Tutor = require('../models/Tutor')
const jwt = require('jsonwebtoken')

const tutorLogin = async (req, res, next) => {
    const credentials = req.body
    const {tutorName, password} = credentials
    try { 
        const check = await Tutor.findOne({tutorName})
        let info = {
            status: "",
            tutorName: "",
            token: ""
        }
     
        if(check === null){
            info.status = "No tutor found"
            res.status(201).json({status: 'success', data:info})
        }
        else{
            const isMatch = await check.checkPassword(password);
            if(isMatch) {
                const claims = {
                    name: check.tutorName,
                    role: "tutor"
                };
                jwt.sign(claims, process.env.JWT_SECRET, function (error, token) {
                    // some problem in generating JWT
                    if (error) {
                        res.status(500).send("Internal Server Error")
                    }

                    info.status = "loginsuccess"
                    info.tutorName = check.tutorName
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
        res.status(401).json({status: 'failed', data:err.message})
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
        res.status(401).json({status: "failed", data: err.message})

    }
}

const postTutor = async (req, res, next) => {
    data = req.body
    try {
        const tutorData = await Tutor.create(data)
        res.status(201).json({status: "success", data: tutorData})
    }
    catch(err) {
        res.status(401).json({status: "failed", data: err.message})
    }
}

module.exports = {
    tutorLogin,
    getTutorList,
    postTutor
}