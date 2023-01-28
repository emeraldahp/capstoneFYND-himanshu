const express = require('express');
const { userLogin } = require('../controllers/users.controller');
const router = express.Router();

router.post("/login", userLogin)

module.exports = router