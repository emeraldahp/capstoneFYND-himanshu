const express = require('express')
const { getEnrollments, postEnrollment, getEnrollmentByCourseName } = require('../controllers/enrollments.controller')

const router = express.Router()

router.get('/', getEnrollments)
router.post('/', postEnrollment)
router.get('/course', getEnrollmentByCourseName)

module.exports = router