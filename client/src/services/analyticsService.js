import {API_URL} from "./apiService";

export const analyticsService = {
    async getTrendsData() {
        try {
            const response = await fetch(`${API_URL}/analytics/trends`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    async getExpensesDistribution() {
        try {
            const response = await fetch(`${API_URL}/analytics/expenses-distribution`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    async getSavingTips() {
        try {
            const response = await fetch(`${API_URL}/analytics/saving-tips`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};