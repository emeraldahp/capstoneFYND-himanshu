const express = require('express');
const { getStructure, postStructure } = require('../controllers/structures.controller')
const router = express.Router();

router.get('/', getStructure)
router.post('/', postStructure)

module.exports = router