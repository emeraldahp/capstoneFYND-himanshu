const express = require('express');
const { getAllCourses, postCourses, getCourseList } = require('../controllers/courses.controller');
const router = express.Router();

router.get("/", getAllCourses)
router.post("/", postCourses)
router.get("/list", getCourseList)

module.exports = router