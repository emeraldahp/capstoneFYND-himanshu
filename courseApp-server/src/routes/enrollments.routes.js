const express = require('express')
const { getEnrollments, postEnrollment, getEnrollmentByCourseName, updateEnrollment, getEnrollmentById } = require('../controllers/enrollments.controller')
const {authorize} = require('../middleware/auth')

const router = express.Router()

router.get('/', getEnrollments)
router.post('/', postEnrollment)
router.get('/course', authorize, getEnrollmentByCourseName)
router.patch('/', updateEnrollment)
router.get('/certificate', getEnrollmentById) //will be public

module.exports = router