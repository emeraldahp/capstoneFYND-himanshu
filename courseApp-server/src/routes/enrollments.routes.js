const express = require('express')
const { getEnrollments, postEnrollment, getEnrollmentByCourseName, updateEnrollment, getEnrollmentById } = require('../controllers/enrollments.controller')
const {authorize} = require('../middleware/auth')

const router = express.Router()

router.get('/', authorize(['user']), getEnrollments) 
router.post('/', authorize(['user']), postEnrollment)
router.get('/course', authorize(['user']), getEnrollmentByCourseName)
router.patch('/', authorize(['user']), updateEnrollment)
router.get('/certificate', getEnrollmentById) //public

module.exports = router