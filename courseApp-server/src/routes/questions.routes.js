const express = require('express')
const {postQuestion, getQuestionsByTutor, addAnsById} = require('../controllers/questions.controller')

const router = express.Router()

router.post('/', postQuestion)
router.get('/', getQuestionsByTutor)
router.patch('/', addAnsById)

module.exports = router