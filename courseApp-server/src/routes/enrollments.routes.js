const express = require('express')
const { getEnrollments, postEnrollment, getEnrollmentByCourseName, updateEnrollment } = require('../controllers/enrollments.controller')

const router = express.Router()

router.get('/', getEnrollments)
router.post('/', postEnrollment)
router.get('/course', getEnrollmentByCourseName)
router.patch('/', updateEnrollment)

module.exports = router