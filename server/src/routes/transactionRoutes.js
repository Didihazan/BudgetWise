// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// הוספת עסקה חדשה
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// קבלת סיכום חודשי
router.get('/summary', async (req, res) => {
    try {
        const { from } = req.query;
        const fromDate = from ? new Date(from) : new Date(new Date().setDate(1));

        const [expenses, income] = await Promise.all([
            Transaction.aggregate([
                {
                    $match: {
                        type: 'expenses',
                        date: { $gte: fromDate }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]),
            Transaction.aggregate([
                {
                    $match: {
                        type: 'income',
                        date: { $gte: fromDate }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ])
        ]);

        res.json({
            expenses: expenses[0]?.total || 0,
            income: income[0]?.total || 0,
            balance: (income[0]?.total || 0) - (expenses[0]?.total || 0)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;