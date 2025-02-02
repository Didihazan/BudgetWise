import React, { useState } from 'react';
import { X, Wallet, Calendar, Plus } from 'lucide-react';

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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('he-IL', {
            style: 'currency',
            currency: 'ILS',
            minimumFractionDigits: 2
        }).format(value);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !category) return;

        onSubmit({
            type,
            amount: parseFloat(amount),
            category,
            description,
            date: new Date().toLocaleString('he-IL')
        });

        // Reset form
        setAmount('');
        setCategory('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-end justify-center md:items-center p-0 md:p-4 z-[70]" dir="rtl">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-gray-500/30 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-lg overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="relative px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-800">רישום תנועה חדשה</h2>
                        <button
                            onClick={onClose}
                            className="p-2 -m-2 hover:bg-gray-50 rounded-full transition-colors"
                            aria-label="סגור"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Type Selector */}
                    <div className="flex gap-2 mt-4 bg-gray-50 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setType('expenses')}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                                ${type === 'expenses'
                                ? 'bg-white text-red-500 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            הוצאה
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                                ${type === 'income'
                                ? 'bg-white text-green-500 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            הכנסה
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-6 max-h-[calc(100vh-16rem)] md:max-h-[60vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Amount Input */}
                        <div className="space-y-2">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                סכום
                            </label>
                            <div className="relative">
                                <Wallet
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5
                                        ${type === 'expenses' ? 'text-red-400' : 'text-green-400'}`}
                                />
                                <input
                                    id="amount"
                                    type="text"
                                    inputMode="decimal"
                                    dir="ltr"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="0.00"
                                    className="w-full py-3 px-4 pr-11 bg-gray-50 border border-gray-200 rounded-xl
                                        focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100
                                        outline-none transition-all text-base text-left"
                                    required
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₪</span>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">קטגוריה</label>
                            <div className="grid grid-cols-2 gap-2">
                                {categories[type].map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setCategory(cat.id)}
                                        className={`p-3 rounded-xl text-center transition-all
                                            ${category === cat.id
                                            ? `${type === 'expenses'
                                                ? 'bg-red-50 border-red-100'
                                                : 'bg-green-50 border-green-100'} border`
                                            : 'bg-gray-50 hover:bg-gray-100 border border-transparent'}`}
                                    >
                                        <div className="text-2xl mb-1">{cat.icon}</div>
                                        <div className="text-sm font-medium text-gray-700">{cat.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description Input */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                תיאור
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="תיאור קצר..."
                                    className="w-full py-3 px-4 pr-11 bg-gray-50 border border-gray-200 rounded-xl
                                        focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100
                                        outline-none transition-all text-base"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={!amount || !category}
                        className={`w-full py-3.5 px-4 rounded-xl text-white font-medium
                            flex items-center justify-center gap-2
                            ${type === 'expenses'
                            ? 'bg-red-500 hover:bg-red-600 disabled:bg-red-300'
                            : 'bg-green-500 hover:bg-green-600 disabled:bg-green-300'
                        } 
                            transition-all disabled:cursor-not-allowed`}
                    >
                        <Plus className="w-5 h-5" />
                        <span>הוסף {type === 'expenses' ? 'הוצאה' : 'הכנסה'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;