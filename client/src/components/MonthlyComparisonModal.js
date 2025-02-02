import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categories = {
    food: 'מזון',
    transport: 'תחבורה',
    bills: 'חשבונות',
    entertainment: 'בילויים',
    shopping: 'קניות'
};

const MonthlyComparisonModal = ({ isOpen, onClose }) => {
    const [selectedMonths, setSelectedMonths] = useState({
        month1: new Date().toISOString().slice(0, 7), // YYYY-MM
        month2: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7)
    });

    const [comparisonData, setComparisonData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComparisonData = async () => {
            setIsLoading(true);
            try {
                // כאן יהיה הקוד שמביא את הנתונים מהשרת
                // לצורך הדוגמה נשתמש בנתונים סטטיים
                const data = {
                    summary: {
                        month1: { total: 5200, count: 28 },
                        month2: { total: 4800, count: 25 },
                        percentageChange: 8.33
                    },
                    categories: {
                        food: { month1: 1500, month2: 1400, change: 7.14 },
                        transport: { month1: 800, month2: 750, change: 6.67 },
                        bills: { month1: 1600, month2: 1500, change: 6.67 },
                        entertainment: { month1: 700, month2: 600, change: 16.67 },
                        shopping: { month1: 600, month2: 550, change: 9.09 }
                    }
                };
                setComparisonData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch comparison data:', error);
                setIsLoading(false);
            }
        };

        if (isOpen) {
            fetchComparisonData();
        }
    }, [isOpen, selectedMonths]);

    if (!isOpen) return null;

    const getChangeIndicator = (change) => {
        if (change > 0) return <TrendingUp className="w-5 h-5 text-red-500" />;
        if (change < 0) return <TrendingDown className="w-5 h-5 text-green-500" />;
        return <Minus className="w-5 h-5 text-gray-400" />;
    };

    const formatMonth = (dateStr) => {
        const [year, month] = dateStr.split('-');
        const date = new Date(year, month - 1);
        return new Intl.DateTimeFormat('he', { year: 'numeric', month: 'long' }).format(date);
    };

    const getBarChartData = () => {
        if (!comparisonData) return [];
        return Object.entries(comparisonData.categories).map(([key, values]) => ({
            name: categories[key],
            'חודש קודם': values.month2,
            'חודש נוכחי': values.month1
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[80]" dir="rtl">
            <div className="absolute inset-0 bg-gray-500/30 backdrop-blur-[2px]" onClick={onClose} />

            <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-medium text-gray-800">השוואה חודשית</h2>
                        <button
                            onClick={onClose}
                            className="p-2 -m-2 hover:bg-gray-50 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
                        <p className="text-gray-500">טוען נתונים...</p>
                    </div>
                ) : comparisonData ? (
                    <div className="p-6">
                        {/* Month Selector */}
                        <div className="flex gap-4 items-center justify-center mb-8">
                            <input
                                type="month"
                                value={selectedMonths.month2}
                                onChange={(e) => setSelectedMonths(prev => ({ ...prev, month2: e.target.value }))}
                                className="px-3 py-2 border border-gray-200 rounded-lg"
                            />
                            <div className="flex gap-2 items-center text-gray-400">
                                <ArrowRight className="w-5 h-5" />
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <input
                                type="month"
                                value={selectedMonths.month1}
                                onChange={(e) => setSelectedMonths(prev => ({ ...prev, month1: e.target.value }))}
                                className="px-3 py-2 border border-gray-200 rounded-lg"
                            />
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">סה"כ {formatMonth(selectedMonths.month1)}</div>
                                <div className="text-2xl font-medium">₪{comparisonData.summary.month1.total.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">{comparisonData.summary.month1.count} תנועות</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">סה"כ {formatMonth(selectedMonths.month2)}</div>
                                <div className="text-2xl font-medium">₪{comparisonData.summary.month2.total.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">{comparisonData.summary.month2.count} תנועות</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">שינוי</div>
                                <div className="text-2xl font-medium flex items-center gap-2">
                                    {getChangeIndicator(comparisonData.summary.percentageChange)}
                                    {Math.abs(comparisonData.summary.percentageChange)}%
                                </div>
                                <div className="text-sm text-gray-500">
                                    {comparisonData.summary.month1.count - comparisonData.summary.month2.count} תנועות שינוי
                                </div>
                            </div>
                        </div>

                        {/* Categories Comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Bar Chart */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <h3 className="text-lg font-medium mb-4">השוואה לפי קטגוריות</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={getBarChartData()} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" />
                                            <Tooltip />
                                            <Bar dataKey="חודש קודם" fill="#94a3b8" />
                                            <Bar dataKey="חודש נוכחי" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Detailed Table */}
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                                <h3 className="text-lg font-medium mb-4">פירוט לפי קטגוריות</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-2 text-right text-gray-600 font-medium">קטגוריה</th>
                                            <th className="py-2 text-right text-gray-600 font-medium">חודש קודם</th>
                                            <th className="py-2 text-right text-gray-600 font-medium">חודש נוכחי</th>
                                            <th className="py-2 text-right text-gray-600 font-medium">שינוי</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Object.entries(comparisonData.categories).map(([key, values]) => (
                                            <tr key={key} className="border-b border-gray-50">
                                                <td className="py-3">{categories[key]}</td>
                                                <td className="py-3">₪{values.month2.toLocaleString()}</td>
                                                <td className="py-3">₪{values.month1.toLocaleString()}</td>
                                                <td className="py-3">
                                                    <div className="flex items-center gap-1">
                                                        {getChangeIndicator(values.change)}
                                                        {Math.abs(values.change)}%
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">לא נמצאו נתונים להשוואה</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyComparisonModal;