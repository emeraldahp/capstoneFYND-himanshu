const express = require('express')
const {postQuestion, getQuestionsByTutor, addAnsById, getQuestionsByUser} = require('../controllers/questions.controller')

const router = express.Router()

router.post('/', postQuestion)
router.get('/', getQuestionsByTutor)
router.patch('/', addAnsById)
router.get('/user', getQuestionsByUser)

module.exports = router