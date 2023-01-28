const express = require('express');
const { tutorLogin } = require('../controllers/tutors.controller');
const router = express.Router();

router.post("/login", tutorLogin)

module.exports = router