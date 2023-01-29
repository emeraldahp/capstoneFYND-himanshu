const express = require('express');
const { tutorLogin, getTutorList, postTutor } = require('../controllers/tutors.controller');
const router = express.Router();

router.post("/login", tutorLogin)
router.get("/list", getTutorList)
router.post("/register", postTutor)


module.exports = router