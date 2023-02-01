const express = require('express');
const { getStructure, postStructure } = require('../controllers/structures.controller');
const { authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', authorize(['user']), getStructure)
router.post('/', authorize(['admin']), postStructure)

module.exports = router