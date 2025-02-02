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

// routes/analyticsRoutes.js

router.get('/saving-tips', async (req, res) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // מביא את סך ההכנסות וההוצאות בחודש האחרון
        const monthlyTotals = await Transaction.aggregate([
            {
                $match: {
                    date: { $gte: threeMonthsAgo }
                }
            },
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // חישוב המאזן הכולל
        const totalExpenses = monthlyTotals.find(t => t._id === 'expenses')?.total || 0;
        const totalIncome = monthlyTotals.find(t => t._id === 'income')?.total || 0;
        const balance = totalIncome - totalExpenses;

        // מביא את ההוצאות לפי קטגוריות
        const categoryExpenses = await Transaction.aggregate([
            {
                $match: {
                    type: 'expenses',
                    date: { $gte: threeMonthsAgo }
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                    avgAmount: { $avg: '$amount' }
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);

        // הכנת התגובה
        const response = {
            isOverspending: balance < 0,
            balance,
            totalExpenses,
            totalIncome,
            savingTips: categoryExpenses.map(category => {
                const monthlyAvg = category.total / 3; // ממוצע חודשי
                let tip = '';

                switch(category._id) {
                    case 'food':
                        tip = monthlyAvg > totalIncome * 0.3 ?
                            'הוצאות המזון שלך גבוהות מהמומלץ (30% מההכנסה). נסו לתכנן קניות מראש ולהשתמש ברשימת קניות.' :
                            'נסו לצמצם קניות ספונטניות ולהעדיף קניות מרוכזות.';
                        break;
                    case 'transport':
                        tip = monthlyAvg > totalIncome * 0.15 ?
                            'הוצאות התחבורה גבוהות מהמומלץ. שקלו שימוש בתחבורה ציבורית או שיתוף נסיעות.' :
                            'בדקו אפשרויות לנסיעות משותפות או מנוי חודשי לתחבורה ציבורית.';
                        break;
                    case 'entertainment':
                        tip = monthlyAvg > totalIncome * 0.1 ?
                            'הוצאות הבילויים גבוהות יחסית. חפשו פעילויות מהנות בעלות נמוכה.' :
                            'נסו למצוא פעילויות פנאי חינמיות או במחיר מוזל.';
                        break;
                    default:
                        tip = 'נסו לעקוב אחר ההוצאות בקטגוריה זו ולזהות דפוסי הוצאה מיותרים.';
                }

                return {
                    category: category._id,
                    monthlyAvg,
                    total: category.total,
                    count: category.count,
                    tip,
                    percentageOfIncome: (monthlyAvg / totalIncome * 100).toFixed(1)
                };
            })
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;