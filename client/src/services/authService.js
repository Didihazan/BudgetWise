import {API_URL, doApiMethod} from "./apiService";

export const userDisconnectionHelper = async (setIsAuthenticated) => {
    try {
        await doApiMethod(`${API_URL}/users/logOut`, 'POST');
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('role');
    }catch (error) {
        console.log('error:', error);
    }
};

export const isTokenExpiredHelper = async (setIsAuthenticated) => {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (!expirationDate || new Date() > expirationDate) {
        await userDisconnectionHelper(setIsAuthenticated);
    } else {
        setIsAuthenticated(true);

    }
};
