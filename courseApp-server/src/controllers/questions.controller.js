const Question = require('../models/Question')

const postQuestion = async (req, res, next) => {

    const data = req.body
    console.log(data)
    const questionData = await Question.create(data)
    res.status(201).json({status:'success sent', data:questionData})

}

module.exports = {
    postQuestion
}
