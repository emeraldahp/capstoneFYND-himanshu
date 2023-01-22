const express = require('express')
const { getEnrollments, postEnrollment } = require('../controllers/enrollments.controller')

const router = express.Router()

router.get('/', getEnrollments)
router.post('/', postEnrollment)

module.exports = router