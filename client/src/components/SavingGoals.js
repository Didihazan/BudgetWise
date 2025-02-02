import React, { useState, useEffect } from 'react';
import { TrendingDown, AlertTriangle } from 'lucide-react';
import { analyticsService } from '../services/analyticsService';

const categoryIcons = {
    food: '🍽️',
    transport: '🚗',
    bills: '📄',
    entertainment: '🎭',
    shopping: '🛍️'
};

const categoryNames = {
    food: 'מזון',
    transport: 'תחבורה',
    bills: 'חשבונות',
    entertainment: 'בילויים',
    shopping: 'קניות'
};

const SavingGoals = () => {
    const [savingsData, setSavingsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavingTips = async () => {
            try {
                const data = await analyticsService.getSavingTips();
                setSavingsData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch saving tips:', error);
                setError('שגיאה בטעינת הנתונים');
                setIsLoading(false);
            }
        };

        fetchSavingTips();
    }, []);

    if (isLoading) {
        return <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
                <div className="h-24 bg-gray-100 rounded"></div>
                <div className="h-24 bg-gray-100 rounded"></div>
            </div>
        </div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    // תצוגת אזהרה אם יש חריגה בהוצאות
    if (savingsData?.isOverspending) {
        return (
            <div className="space-y-4" dir="rtl">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h3 className="font-medium text-red-700">שים לב! החשבון שלך בחריגה</h3>
                    </div>
                    <p className="text-sm text-red-600 mb-2">
                        בשלושת החודשים האחרונים הוצאת {Math.abs(savingsData.balance).toLocaleString()} ₪ יותר מההכנסות שלך
                    </p>
                    <div className="text-sm text-red-600">
                        הכנסות: {savingsData.totalIncome.toLocaleString()} ₪ |
                        הוצאות: {savingsData.totalExpenses.toLocaleString()} ₪
                    </div>
                </div>

                {savingsData.savingTips.map((tip, index) => (
                    <div
                        key={tip.category}
                        className="bg-white p-4 rounded-xl border border-gray-200"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-2xl">
                                {categoryIcons[tip.category] || '💡'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium">
                                        {categoryNames[tip.category] || tip.category}
                                    </h3>
                                    <div className="text-sm font-medium text-gray-900">
                                        {tip.monthlyAvg.toLocaleString()} ₪
                                        <span className="text-gray-500 text-xs"> / חודש</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 mb-2">
                                    {tip.percentageOfIncome}% מההכנסה החודשית
                                </div>
                                <p className="text-sm text-red-600">
                                    {tip.tip}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-700 text-center">
                        הטיפים מבוססים על ניתוח ההוצאות שלך ב-3 החודשים האחרונים.
                        שקול לערוך תקציב חודשי ולעקוב אחריו.
                    </p>
                </div>
            </div>
        );
    }

    // תצוגה רגילה אם הכל בסדר
    return (
        <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-green-900 mb-2">מצוין!</h3>
            <p className="text-green-700">
                ההוצאות שלך נמוכות מההכנסות.
                המשך לשמור על איזון תקציבי!
            </p>
        </div>
    );
};

export default SavingGoals;