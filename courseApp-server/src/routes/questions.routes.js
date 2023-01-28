const express = require('express')
const {postQuestion, getQuestionsByTutor} = require('../controllers/questions.controller')

const router = express.Router()

router.post('/', postQuestion)
router.get('/', getQuestionsByTutor)

module.exports = router