const express = require('express');
const { getAllCourses, postCourses, getCourseList, getTutorNameByCourse } = require('../controllers/courses.controller');
const router = express.Router();

router.get("/", getAllCourses)
router.post("/", postCourses)
router.get("/list", getCourseList)
router.get("/tutor", getTutorNameByCourse)

module.exports = router