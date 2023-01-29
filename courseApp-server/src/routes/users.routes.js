const express = require('express');
const { userLogin, getUserList } = require('../controllers/users.controller');
const router = express.Router();

router.post("/login", userLogin)
router.get("/list", getUserList)

module.exports = router