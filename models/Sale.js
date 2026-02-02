const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    items: [{
        part: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Part',
            required: true
        },
        name: { type: String, required: true }, // Store name for historical record
        sku: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Unit price
        total: { type: Number, required: true }  // quantity * price
    }],
    subtotal: {
        type: Number,
        required: true
    },
    gstRate: {
        type: Number,
        default: 18 // Default 18%
    },
    gstAmount: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        default: 'Guest'
    },
    soldBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;
