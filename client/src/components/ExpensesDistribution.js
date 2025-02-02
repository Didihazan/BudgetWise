import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { analyticsService } from '../services/analyticsService';

const ExpensesDistribution = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);

    // צבעים מודרניים יותר עם ניגודיות טובה
    const COLORS = {
        'מזון': '#FF6B6B',          // אדום-כתום
        'תחבורה': '#4ECDC4',        // טורקיז
        'חשבונות': '#45B7D1',       // כחול בהיר
        'בילויים': '#96CEB4',       // ירוק מנטה
        'קניות': '#9B5DE5',         // סגול
        'אחר': '#FED766'            // צהוב
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const distributionData = await analyticsService.getExpensesDistribution();
                setData(distributionData);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch distribution data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    if (isLoading) {
        return <div className="text-center py-8">טוען נתונים...</div>;
    }

    // חישוב האחוזים והסכום הכולל
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const formattedData = data.map(item => ({
        ...item,
        percentage: ((item.value / total) * 100).toFixed(1)
    }));

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">התפלגות הוצאות</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* תרשים עוגה */}
                <div className="w-full md:w-1/2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[entry.name] || COLORS['אחר']}
                                        stroke="white"
                                        strokeWidth={2}
                                        style={{
                                            filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `₪${value.toLocaleString()}`}
                                contentStyle={{
                                    direction: 'rtl',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    border: 'none',
                                    padding: '8px 12px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* רשימת קטגוריות */}
                <div className="w-full md:w-1/2 space-y-3">
                    {formattedData.map((entry, index) => (
                        <div
                            key={`category-${index}`}
                            className="flex items-center justify-between p-3 rounded-lg transition-all"
                            style={{
                                backgroundColor: `${COLORS[entry.name]}15`,
                                transform: activeIndex === index ? 'scale(1.02)' : 'scale(1)',
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: COLORS[entry.name] || COLORS['אחר'] }}
                                />
                                <span className="font-medium">{entry.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {entry.percentage}%
                                </span>
                                <span className="font-medium">
                                    ₪{entry.value.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* סיכום כולל */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">סה"כ הוצאות:</span>
                    <span className="text-xl font-bold text-gray-800">
                        ₪{total.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ExpensesDistribution;