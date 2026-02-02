const Supplier = require('../models/Supplier');

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({});
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a supplier
// @route   POST /api/suppliers
// @access  Private
const createSupplier = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const supplier = new Supplier({ name, email, phone, address });
        const createdSupplier = await supplier.save();
        res.status(201).json(createdSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private
const updateSupplier = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const supplier = await Supplier.findById(req.params.id);

        if (supplier) {
            supplier.name = name || supplier.name;
            supplier.email = email || supplier.email;
            supplier.phone = phone || supplier.phone;
            supplier.address = address || supplier.address;
            const updatedSupplier = await supplier.save();
            res.json(updatedSupplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getSuppliers, createSupplier, updateSupplier };
