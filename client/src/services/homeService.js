// services/homeService.js
const BASE_URL = 'http://localhost:3000/api';

export const homeService = {
    async getHomeContent() {
        try {
            const response = await fetch(`${BASE_URL}/transactions/summary`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async addTransaction(transaction) {
        try {
            const response = await fetch(`${BASE_URL}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};