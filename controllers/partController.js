const Part = require('../models/Part');

// @desc    Fetch all parts
// @route   GET /api/parts
// @access  Public/Private
const getParts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {};
        
        const category = req.query.category ? { category: req.query.category } : {};

        const parts = await Part.find({ ...keyword, ...category });
        res.json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single part
// @route   GET /api/parts/:id
// @access  Public/Private
const getPartById = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id);

        if (part) {
            res.json(part);
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a part
// @route   POST /api/parts
// @access  Private/Admin
const createPart = async (req, res) => {
    try {
        const { name, sku, category, quantity, price, minStockLevel, location } = req.body;

        const part = new Part({
            name,
            sku,
            category,
            quantity,
            price,
            minStockLevel,
            location
        });

        const createdPart = await part.save();
        res.status(201).json(createdPart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a part
// @route   PUT /api/parts/:id
// @access  Private/Admin
const updatePart = async (req, res) => {
    try {
        const { name, sku, category, quantity, price, minStockLevel, location } = req.body;

        const part = await Part.findById(req.params.id);

        if (part) {
            part.name = name || part.name;
            part.sku = sku || part.sku;
            part.category = category || part.category;
            part.quantity = quantity !== undefined ? quantity : part.quantity;
            part.price = price !== undefined ? price : part.price;
            part.minStockLevel = minStockLevel !== undefined ? minStockLevel : part.minStockLevel;
            part.location = location || part.location;

            const updatedPart = await part.save();
            res.json(updatedPart);
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a part
// @route   DELETE /api/parts/:id
// @access  Private/Admin
const deletePart = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id);

        if (part) {
            await part.deleteOne();
            res.json({ message: 'Part removed' });
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getParts,
    getPartById,
    createPart,
    updatePart,
    deletePart,
};
