const express = require('express')
const { getEnrollments } = require('../controllers/enrollments.controller')

const router = express.Router()

router.get('/', getEnrollments)

module.exports = router