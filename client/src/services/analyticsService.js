// services/analyticsService.js
const BASE_URL = 'http://localhost:3000/api';

export const analyticsService = {
    async getTrendsData() {
        try {
            const response = await fetch(`${BASE_URL}/analytics/trends`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },  // <-- נוסף פסיק כאן
    async getExpensesDistribution() {
        try {
            const response = await fetch(`${BASE_URL}/analytics/expenses-distribution`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};