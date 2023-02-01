const express = require('express');
const { userLogin, getUserList, postUser } = require('../controllers/users.controller');
const router = express.Router();

router.post("/login", userLogin) //public
router.get("/list", getUserList)  //public
router.post("/register", postUser)  //public

module.exports = router