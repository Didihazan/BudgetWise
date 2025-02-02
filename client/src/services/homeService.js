// services/homeService.js
import {API_URL} from "./apiService";

export const homeService = {
    async getHomeContent() {
        try {
            const response = await fetch(`${API_URL}/transactions/summary`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async addTransaction(transaction) {
        try {
            console.log('שולח עסקה:', transaction);

            const response = await fetch(`${API_URL}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'שגיאה בהוספת העסקה');
            }

            return await response.json();
        } catch (error) {
            console.error('שגיאה בשירות:', error);
            throw error;
        }
    }
};