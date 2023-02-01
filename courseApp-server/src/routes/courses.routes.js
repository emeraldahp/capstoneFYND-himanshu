const express = require('express');
const { getAllCourses, postCourses, getCourseList, getTutorNameByCourse } = require('../controllers/courses.controller');
const { authorize } = require('../middleware/auth');
const router = express.Router();

router.get("/", getAllCourses) //public
router.post("/", authorize(['admin']), postCourses)
router.get("/list", authorize(['admin']), getCourseList)
router.get("/tutor", getTutorNameByCourse) //public

module.exports = router