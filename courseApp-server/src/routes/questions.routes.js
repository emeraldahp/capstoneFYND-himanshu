const express = require('express')
const {postQuestion, getQuestionsByTutor, addAnsById, getQuestionsByUser, removeQuestionById} = require('../controllers/questions.controller')
const { authorize } = require('../middleware/auth')

const router = express.Router()

router.post('/', authorize(['user']), postQuestion)
router.get('/', authorize(['tutor']), getQuestionsByTutor)
router.patch('/',authorize(['tutor']), addAnsById)
router.get('/user', authorize(['user']), getQuestionsByUser)
router.delete('/', authorize(['user']), removeQuestionById)

module.exports = router