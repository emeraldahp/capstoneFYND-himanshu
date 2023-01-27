const express = require('express')
const {postQuestion} = require('../controllers/questions.controller')

const router = express.Router()

router.post('/', postQuestion)

module.exports = router