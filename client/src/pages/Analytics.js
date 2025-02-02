import React, {useEffect, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {analyticsService} from '../services/analyticsService';
import ExpensesDistribution from "../components/ExpensesDistribution";
import SavingGoals from "../components/SavingGoals";

const Analytics = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendsData = await analyticsService.getTrendsData();
                console.log('Data from server:', trendsData); // לדיבוג
                setData(trendsData);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch analytics data:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">טוען נתונים...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">שגיאה בטעינת הנתונים: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16" dir="rtl">
            <h1 className="text-2xl font-bold mb-6">ניתוח פיננסי</h1>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">מגמות חודשיות</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip contentStyle={{direction: 'rtl'}}/>
                            <Line
                                type="monotone"
                                dataKey="הוצאות"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{stroke: '#ef4444', strokeWidth: 2, r: 4}}
                                activeDot={{r: 8}}
                            />
                            <Line
                                type="monotone"
                                dataKey="הכנסות"
                                stroke="#22c55e"
                                strokeWidth={2}
                                dot={{stroke: '#22c55e', strokeWidth: 2, r: 4}}
                                activeDot={{r: 8}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpensesDistribution/>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">יעדי חיסכון</h2>
                    <SavingGoals/>
                </div>
            </div>
        </div>
    );
};

export default Analytics;