import React, { useEffect, useState } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar } from 'lucide-react';
import { homeService } from "../services/homeService";
import TransactionModal from "./TransactionModal";

const Home = () => {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // נוסיף את התקופה הנבחרת לבקשה
                const data = await homeService.getHomeContent(selectedPeriod);
                setContent(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch home content:', error);
                setIsLoading(false);
            }
        };
        fetchContent();
    }, [selectedPeriod]); // התלות בתקופה הנבחרת תגרום לרענון אוטומטי

    const handleTransactionSubmit = async (transaction) => {
        try {
            await homeService.addTransaction(transaction);
            // רענן את הנתונים
            const updatedData = await homeService.getHomeContent();
            setContent(updatedData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to add transaction:', error);
            // כאן תוכל להוסיף הודעת שגיאה למשתמש
        }
    };

    const periods = [
        { id: 'week', label: 'שבוע' },
        { id: 'month', label: 'חודש' },
        { id: 'year', label: 'שנה' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 rtl">
            {/* כותרת ראשית */}
            <div className="text-center mb-8 pt-4">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">ברוכים הבאים לחכם פיננסי</h1>
                <p className="text-blue-600">נהל את הכספים שלך בחכמה</p>
            </div>

            {/* בחירת תקופה */}
            <div className="flex justify-center gap-2 mb-6">
                {periods.map(period => (
                    <button
                        key={period.id}
                        onClick={() => setSelectedPeriod(period.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                            selectedPeriod === period.id
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                        }`}
                    >
                        {period.label}
                    </button>
                ))}
            </div>

            {/* כרטיסי סיכום */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* הכנסות */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <TrendingUp className="w-6 h-6 text-green-600"/>
                        </div>
                        <span className="text-sm text-gray-500">הכנסות</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 rtl">
                        ₪{content?.income?.toLocaleString() || 0}
                    </h3>
                </div>

                {/* הוצאות */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <TrendingDown className="w-6 h-6 text-red-600"/>
                        </div>
                        <span className="text-sm text-gray-500">הוצאות</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 rtl">
                        ₪{content?.expenses?.toLocaleString() || 0}
                    </h3>
                </div>

                {/* יתרה */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <DollarSign className="w-6 h-6 text-blue-600"/>
                        </div>
                        <span className="text-sm text-gray-500">יתרה</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 rtl">
                        ₪{content?.balance?.toLocaleString() || 0}
                    </h3>
                </div>
            </div>

            {/* קישורים מהירים */}
            <div className="grid grid-cols-2 gap-4 mb-8">

                <button
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors">
                    <Calendar className="w-5 h-5"/>
                    <span>השוואה חודשית</span>
                </button>
            </div>

            {/* כפתור הוספה */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
                aria-label="הוסף הוצאה או הכנסה"
            >
                <Plus className="w-6 h-6"/>
            </button>
            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleTransactionSubmit}
            />
        </div>
    );
};

export default Home;