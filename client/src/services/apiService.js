import axios from 'axios'
// export const API_URL =
//     process.env.NODE_ENV === 'production'
//         ? 'https://budgetwise-server.onrender.com/api'
//         : 'https://budgetwise-server.onrender.com/api'

export const API_URL = 'http://localhost:3000/api'
export const TOKEN_KEY = 'token'
axios.defaults.withCredentials = true
export const loginTimeStandard = 1000 * 60 * 60 * 24 * 7 // 7 days
export const loginTimeExtended = 1000 * 60 * 60 * 24 * 15 // 15 days

export const doApiGet = async (_url) => {
    try {
        let resp = await axios({
            url: _url,
            method: 'GET',
            headers: {
                'x-api-key': localStorage.getItem(TOKEN_KEY),
            },
        })
        return resp.data
    } catch (err) {
        throw err
    }
}
export const doApiMethod = async (
    _url,
    _method,
    _body = {},
    _content_type = 'application/json',
) => {
    try {
        let resp = await axios({
            url: _url,
            method: _method,
            data: _body,
            headers: {
                'x-api-key': localStorage.getItem(TOKEN_KEY),
                'content-type': _content_type,
            },
        })
        return resp.data
    } catch (err) {
        throw err
    }
}


