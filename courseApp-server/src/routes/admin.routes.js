const express = require('express');
const { adminLogin, getAdminList } = require('../controllers/admins.controller');
const router = express.Router();

router.post("/login", adminLogin)
router.get("/list", getAdminList)

module.exports = router