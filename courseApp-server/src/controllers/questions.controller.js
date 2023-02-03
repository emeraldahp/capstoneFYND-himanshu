const Question = require('../models/Question')
const {coursesListByTutor} = require('./courses.controller')

const postQuestion = async (req, res, next) => {

    const data = req.body
  
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
  
    try {
        const coursesList = await coursesListByTutor(tutorName)
      
        const questionData = await Question.find({"courseName": {$in:coursesList}})
        res.status(201).json({status:'success received', data: questionData})
    }
    catch(err) {
        res.status(201).json({status:'failed', data: err.message})
    }
}

const addAnsById = async (req, res, next) => {
    const {_id, answer} = req.body
  
    let response
    try {
        response = await Question.findOneAndUpdate({_id},{answer})
        res.status(201).json({status:'success sent', data:response})
    }
    catch(err) {
        res.status(201).json({status:'failed', data:err.message})
    }
}

const getQuestionsByUser = async (req, res, next) => {
    const {userName} = req.query
   
    try {
        response = await Question.find({userName})
        res.status(201).json({status:'success received', data:response})
    }
    catch(err) {
        res.status(201).json({status:'failed', data:err.message})
    }
}

const removeQuestionById = async (req, res, next) => {
    const {_id} = req.query
    try {
        response = await Question.deleteOne({_id})
        res.status(201).json({status:'success delete', data: response})
    }
    catch(err) {
        res.status(201).json({status:'failed', data: err.message})
    }
}

module.exports = {
    postQuestion,
    getQuestionsByTutor,
    addAnsById,
    getQuestionsByUser,
    removeQuestionById
}
