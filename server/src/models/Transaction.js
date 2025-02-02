// models/Transaction.js
const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['expenses', 'income'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
// models/Transaction.js
module.exports = mongoose.model('Transaction', transactionSchema);