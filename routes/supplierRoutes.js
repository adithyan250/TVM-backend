const express = require('express');
const router = express.Router();
const {
    getSuppliers,
    createSupplier,
    updateSupplier,
} = require('../controllers/supplierController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getSuppliers)
    .post(protect, admin, createSupplier);

router.route('/:id')
    .put(protect, admin, updateSupplier);

module.exports = router;
