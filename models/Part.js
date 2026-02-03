const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    wholesalePrice: {
        type: Number,
        required: true,
        default: 0
    },
    minStockLevel: {
        type: Number,
        default: 5
    },
    location: {
        type: String
    }
}, {
    timestamps: true
});

const Part = mongoose.model('Part', partSchema);
module.exports = Part;
