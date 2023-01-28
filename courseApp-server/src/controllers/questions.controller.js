const Question = require('../models/Question')

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

module.exports = {
    postQuestion
}
