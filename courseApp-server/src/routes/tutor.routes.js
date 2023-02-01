const express = require('express');
const { tutorLogin, getTutorList, postTutor } = require('../controllers/tutors.controller');
const router = express.Router();

router.post("/login", tutorLogin) //public
router.get("/list", getTutorList) //public
router.post("/register", postTutor) //public


module.exports = router