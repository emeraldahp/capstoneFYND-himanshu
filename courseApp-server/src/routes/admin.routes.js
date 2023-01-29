const express = require('express');
const { adminLogin, getAdminList, postAdmin } = require('../controllers/admins.controller');
const router = express.Router();

router.post("/login", adminLogin)
router.get("/list", getAdminList)
router.post("/register", postAdmin)

module.exports = router