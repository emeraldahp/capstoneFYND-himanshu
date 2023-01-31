const express = require('express')
const { getEnrollments, postEnrollment, getEnrollmentByCourseName, updateEnrollment, getEnrollmentById } = require('../controllers/enrollments.controller')

const router = express.Router()

router.get('/', getEnrollments)
router.post('/', postEnrollment)
router.get('/course', getEnrollmentByCourseName)
router.patch('/', updateEnrollment)
router.get('/certificate', getEnrollmentById) //will be public

module.exports = router