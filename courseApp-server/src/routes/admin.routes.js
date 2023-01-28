const express = require('express');
const { adminLogin } = require('../controllers/admins.controller');
const router = express.Router();

router.post("/login", adminLogin)

module.exports = router