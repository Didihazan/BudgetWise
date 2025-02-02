import React, { useState } from 'react';
import { Edit2, Trash2, X } from 'lucide-react';
import { homeService } from '../services/homeService';

const TransactionsList = ({ transactions, type, onClose, onTransactionChange }) => {
    const [editingId, setEditingId] = useState(null);
    const [editedTransaction, setEditedTransaction] = useState(null);

    const handleEdit = (transaction) => {
        setEditingId(transaction._id);
        setEditedTransaction(transaction);
    };

    const handleUpdate = async () => {
        try {
            await homeService.updateTransaction(editingId, editedTransaction);
            setEditingId(null);
            onTransactionChange();
        } catch (error) {
            console.error('Failed to update transaction:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק עסקה זו?')) {
            try {
                await homeService.deleteTransaction(id);
                onTransactionChange();
            } catch (error) {
                console.error('Failed to delete transaction:', error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{type === 'income' ? 'הכנסות' : 'הוצאות'}</h2>
                    <button onClick={onClose} className="p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div key={transaction._id} className="border rounded-lg p-4">
                            {editingId === transaction._id ? (
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        value={editedTransaction.amount}
                                        onChange={(e) => setEditedTransaction({
                                            ...editedTransaction,
                                            amount: parseFloat(e.target.value)
                                        })}
                                        className="border rounded p-2 w-full"
                                    />
                                    <input
                                        type="text"
                                        value={editedTransaction.description}
                                        onChange={(e) => setEditedTransaction({
                                            ...editedTransaction,
                                            description: e.target.value
                                        })}
                                        className="border rounded p-2 w-full"
                                    />
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        שמור
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">₪{transaction.amount.toLocaleString()}</p>
                                        <p className="text-gray-600">{transaction.description}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(transaction.date).toLocaleDateString('he-IL')}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(transaction)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(transaction._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionsList;