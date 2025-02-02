import { API_URL, doApiGet, doApiMethod } from "./apiService";

export const homeService = {
    async getHomeContent(period = 'month') {
        try {
            return await doApiGet(`${API_URL}/transactions/summary?period=${period}`);
        } catch (error) {
            throw error;
        }
    },

    async getTransactionsByType(type) {
        try {
            return await doApiGet(`${API_URL}/transactions?type=${type}`);
        } catch (error) {
            throw error;
        }
    },

    async addTransaction(transaction) {
        try {
            return await doApiMethod(`${API_URL}/transactions`, 'POST', transaction);
        } catch (error) {
            throw error;
        }
    },

    async updateTransaction(id, transaction) {
        try {
            return await doApiMethod(`${API_URL}/transactions/${id}`, 'PUT', transaction);
        } catch (error) {
            throw error;
        }
    },

    async deleteTransaction(id) {
        try {
            return await doApiMethod(`${API_URL}/transactions/${id}`, 'DELETE');
        } catch (error) {
            throw error;
        }
    }
};