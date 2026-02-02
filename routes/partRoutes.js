const express = require('express');
const router = express.Router();
const {
    getParts,
    getPartById,
    createPart,
    updatePart,
    deletePart,
} = require('../controllers/partController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getParts)
    .post(protect, admin, createPart);

router.route('/:id')
    .get(protect, getPartById)
    .put(protect, admin, updatePart)
    .delete(protect, admin, deletePart);

module.exports = router;
