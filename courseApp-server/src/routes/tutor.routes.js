const express = require('express');
const { tutorLogin, getTutorList } = require('../controllers/tutors.controller');
const router = express.Router();

router.post("/login", tutorLogin)
router.get("/list", getTutorList)

module.exports = router