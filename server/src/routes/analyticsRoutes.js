// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/trends', async (req, res) => {
    try {
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6); // מביא נתונים של 6 חודשים אחורה

        const transactions = await Transaction.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: currentDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month"
                    },
                    הוצאות: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.type", "expenses"], }, "$total", 0]
                        }
                    },
                    הכנסות: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.type", "income"], }, "$total", 0]
                        }
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
            'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

        // יצירת מערך של 6 חודשים אחורה עם ערכי 0 כברירת מחדל
        const monthsData = Array.from({ length: 6 }, (_, index) => {
            const date = new Date();
            date.setMonth(date.getMonth() - (5 - index));
            return {
                month: monthNames[date.getMonth()],
                הוצאות: 0,
                הכנסות: 0
            };
        });

        // עדכון הנתונים עם המידע מהדאטהבייס
        transactions.forEach(transaction => {
            const monthIndex = monthsData.findIndex(
                item => item.month === monthNames[transaction._id.month - 1]
            );
            if (monthIndex !== -1) {
                monthsData[monthIndex].הוצאות = transaction.הוצאות;
                monthsData[monthIndex].הכנסות = transaction.הכנסות;
            }
        });

        res.json(monthsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/expenses-distribution', async (req, res) => {
    try {
        const categoryData = await Transaction.aggregate([
            {
                $match: {
                    type: 'expenses'  // רק הוצאות
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // ממיר את הקטגוריות לעברית
        const categoryNames = {
            'food': 'מזון',
            'transport': 'תחבורה',
            'bills': 'חשבונות',
            'entertainment': 'בילויים',
            'shopping': 'קניות'
        };

        const formattedData = categoryData.map(item => ({
            name: categoryNames[item._id] || item._id,
            value: item.total
        }));

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;