const express = require('express');
const { getAllCourses, postCourses } = require('../controllers/courses.controller');
const router = express.Router();

router.get("/", getAllCourses)
router.post("/", postCourses)

module.exports = router