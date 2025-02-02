import React, { useState } from 'react';
import { X, Wallet, Calendar } from 'lucide-react';

const categories = {
    expenses: [
        { id: 'food', label: 'מזון', icon: '🍽️' },
        { id: 'transport', label: 'תחבורה', icon: '🚗' },
        { id: 'bills', label: 'חשבונות', icon: '📄' },
        { id: 'entertainment', label: 'בילויים', icon: '🎭' },
        { id: 'shopping', label: 'קניות', icon: '🛍️' }
    ],
    income: [
        { id: 'salary', label: 'משכורת', icon: '💰' },
        { id: 'business', label: 'עסק', icon: '💼' },
        { id: 'investment', label: 'השקעות', icon: '📈' },
        { id: 'other', label: 'אחר', icon: '✨' }
    ]
};

const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
    const [type, setType] = useState('expenses');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            type,
            amount: parseFloat(amount),
            category,
            description,
            date: new Date()
        });
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0">
            <div className="bg-white rounded-t-3xl md:rounded-3xl w-full h-[85vh] md:h-auto md:max-h-[90vh] md:max-w-lg mx-auto shadow-xl animate-slide-up overflow-y-auto">
                {/* Header - קבוע למעלה */}
                <div className="sticky top-0 bg-white px-4 py-4 border-b border-gray-100 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">הוספת תנועה חדשה</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* תוכן הטופס - עם גלילה */}
                <div className="p-4 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* כפתורי בחירת סוג */}
                        <div className="flex gap-3 p-1 bg-gray-50 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => setType('expenses')}
                                className={`flex-1 py-3 text-sm md:text-base px-4 md:px-6 rounded-xl transition-all duration-200 ${
                                    type === 'expenses'
                                        ? 'bg-red-600 text-white shadow-lg'
                                        : 'bg-transparent text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                הוצאה
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`flex-1 py-3 text-sm md:text-base px-4 md:px-6 rounded-xl transition-all duration-200 ${
                                    type === 'income'
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-transparent text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                הכנסה
                            </button>
                        </div>

                        {/* שדה סכום */}
                        <div className="relative">
                            <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
                                <Wallet className={`w-5 h-5 ${type === 'expenses' ? 'text-red-500' : 'text-green-500'}`} />
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="סכום"
                                className="w-full py-3 md:py-4 px-3 md:px-4 pr-10 md:pr-12 border-2 border-gray-100 rounded-xl md:rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                                required
                            />
                        </div>

                        {/* בחירת קטגוריה */}
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {categories[type].map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setCategory(cat.id)}
                                    className={`p-3 rounded-xl md:rounded-2xl text-center transition-all ${
                                        category === cat.id
                                            ? `${type === 'expenses' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border-2`
                                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                    }`}
                                >
                                    <div className="text-xl md:text-2xl mb-1">{cat.icon}</div>
                                    <div className="text-xs md:text-sm font-medium">{cat.label}</div>
                                </button>
                            ))}
                        </div>

                        {/* שדה תיאור */}
                        <div className="relative">
                            <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="תיאור"
                                className="w-full py-3 md:py-4 px-3 md:px-4 pr-10 md:pr-12 border-2 border-gray-100 rounded-xl md:rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                            />
                        </div>
                    </form>
                </div>

                {/* Footer - קבוע למטה */}
                <div className="sticky bottom-0 bg-white px-4 py-4 border-t border-gray-100 mt-auto">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl text-white font-medium shadow-lg 
                            ${type === 'expenses'
                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                        } 
                            transition-all hover:shadow-xl active:scale-98`}
                    >
                        הוסף {type === 'expenses' ? 'הוצאה' : 'הכנסה'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;