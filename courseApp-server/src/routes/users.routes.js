const express = require('express');
const { userLogin, getUserList, postUser } = require('../controllers/users.controller');
const router = express.Router();

router.post("/login", userLogin)
router.get("/list", getUserList)
router.post("/register", postUser)

module.exports = router