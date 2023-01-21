const express = require('express');
const { getStructure } = require('../controllers/structures.controller')
const router = express.Router();

router.get('/', getStructure)

module.exports = router