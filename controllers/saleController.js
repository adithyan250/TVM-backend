const Sale = require('../models/Sale');
const Part = require('../models/Part');

// @desc    Create a new sale
// @route   POST /api/sales
// @access  Private
const createSale = async (req, res) => {
    try {
        const { items, customerName, gstRate = 18 } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in sale' });
        }

        // 1. Calculate totals and validate stock
        let subtotal = 0;
        const processedItems = [];

        for (const item of items) {
            const part = await Part.findById(item.part);
            
            if (!part) {
                return res.status(404).json({ message: `Part not found: ${item.part}` });
            }

            if (part.quantity < item.quantity) {
                return res.status(400).json({ 
                    message: `Insufficient stock for ${part.name}. Available: ${part.quantity}` 
                });
            }

            const itemTotal = part.price * item.quantity;
            subtotal += itemTotal;

            processedItems.push({
                part: part._id,
                name: part.name,
                sku: part.sku,
                quantity: parseInt(item.quantity),
                price: part.price,
                total: itemTotal
            });

            // Decrease stock
            part.quantity -= item.quantity;
            await part.save();
        }

        const gstAmount = (subtotal * gstRate) / 100;
        const grandTotal = subtotal + gstAmount;

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const sale = new Sale({
            items: processedItems,
            subtotal,
            gstRate,
            gstAmount,
            grandTotal,
            customerName,
            soldBy: req.user._id
        });

        const createdSale = await sale.save();
        res.status(201).json(createdSale);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
const getSales = async (req, res) => {
    try {
        const sales = await Sale.find({})
            .populate('soldBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSale,
    getSales
};
