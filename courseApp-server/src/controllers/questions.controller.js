const { update } = require('../models/Question')
const Question = require('../models/Question')
const {coursesListByTutor} = require('./courses.controller')

const postQuestion = async (req, res, next) => {

    const data = req.body
    console.log(data)
    try {
        const questionData = await Question.create(data)
        res.status(201).json({status:'success sent', data:questionData})
    }
    catch(err) {
        res.status(201).json({status:'failed', data:err.message})
    }

}



const getQuestionsByTutor = async (req, res, next) => {
    const {tutorName} = req.query
    console.log(req.query)
    try {
        const coursesList = await coursesListByTutor(tutorName)
        console.log("inQues",coursesList)
        const questionData = await Question.find({"courseName": {$in:coursesList}})
        res.status(201).json({status:'success received', data: questionData})
    }
    catch(err) {
        res.status(201).json({status:'failed', data: err.message})
    }
}

const addAnsById = async(req, res, next) => {
    const {_id, answer} = req.body
    console.log(req.body)
    let response
    try {
        response = await Question.findOneAndUpdate({_id},{answer})
        res.status(201).json({status:'success sent', data:response})
    }
    catch(err) {
        res.status(201).json({status:'failed', data:err.message})
    }
}

module.exports = {
    postQuestion,
    getQuestionsByTutor,
    addAnsById
}
