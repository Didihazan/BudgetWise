// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const { type } = req.query;

        if (!type || !['expenses', 'income'].includes(type)) {
            return res.status(400).json({ message: 'סוג עסקה לא תקין' });
        }

        const transactions = await Transaction.find({ type })
            .sort({ date: -1 });

        res.json(transactions);
    } catch (error) {
        console.error('שגיאה בקבלת העסקאות:', error);
        res.status(500).json({ message: error.message });
    }
});

// הוספת עסקה חדשה
router.post('/', async (req, res) => {
    try {
        console.log('נתוני העסקה שהתקבלו:', req.body);

        // בדיקת תקינות הנתונים
        if (!req.body.amount || !req.body.type || !req.body.category) {
            return res.status(400).json({
                message: 'חסרים שדות חובה',
                receivedData: req.body
            });
        }

        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.error('שגיאה בשמירת העסקה:', error);
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

// הוספת ראוטים חדשים לעדכון ומחיקה
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.amount || !req.body.type || !req.body.category) {
            return res.status(400).json({ message: 'חסרים שדות חובה' });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'העסקה לא נמצאה' });
        }

        res.json(updatedTransaction);
    } catch (error) {
        console.error('שגיאה בעדכון העסקה:', error);
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'העסקה לא נמצאה' });
        }

        res.json({ message: 'העסקה נמחקה בהצלחה', transaction: deletedTransaction });
    } catch (error) {
        console.error('שגיאה במחיקת העסקה:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;