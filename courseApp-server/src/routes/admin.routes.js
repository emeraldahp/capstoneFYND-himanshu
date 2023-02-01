const express = require('express');
const { adminLogin, getAdminList, postAdmin } = require('../controllers/admins.controller');
const router = express.Router();

router.post("/login", adminLogin)  //public
router.get("/list", getAdminList)  //public
router.post("/register", postAdmin)  //public

module.exports = router