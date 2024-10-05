import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    TOKEN_REFRESH_REQUEST,
    TOKEN_REFRESH_SUCCESS,
    TOKEN_REFRESH_FAILURE,
    SET_EMAIL_LOGIN,
    SET_PASSWORD_LOGIN,
    SET_EMAIL_REGISTER,
    SET_PASSWORD_REGISTER,
    SET_NAME_REGISTER,
    FORGOT_PASSWORD_VISITED
} from './action-types';
import { request } from '../../api/request-response';

export const setEmailRegister = (email) => ({
    type: SET_EMAIL_REGISTER, payload: email
});
export const setPasswordRegister = (password) => ({
    type: SET_PASSWORD_REGISTER, payload: password
});
export const setNameRegister = (name) => ({
    type: SET_NAME_REGISTER, payload: name
});
export const setEmailLogin = (email) => ({
    type: SET_EMAIL_LOGIN, payload: email
});
export const setPasswordLogin = (password) => ({
    type: SET_PASSWORD_LOGIN, payload: password
});

export const registerUser = (email, password, name) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });
        request('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        })
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: { user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }
                    });
                    localStorage.setItem('refreshToken', data.refreshToken);
                    localStorage.setItem('accessToken', data.accessToken);
                } else if (data.status === 401 || data.status === 403) {
                    dispatch({ type: REGISTER_FAILURE, payload: 'Пользователь уже существует' });
                } else {
                    dispatch({ type: REGISTER_FAILURE, payload: data.message });
                }
            })
            .catch(error => {
                dispatch({ type: REGISTER_FAILURE, payload: error.message });
            });
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        request('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }
                    });
                    localStorage.setItem('refreshToken', data.refreshToken);
                    localStorage.setItem('accessToken', data.accessToken);
                } else if (data.status === 401 || data.status === 403) {
                    dispatch({ type: LOGIN_FAILURE, payload: 'Неверный логин или пароль' });
                } else {
                    dispatch({ type: LOGIN_FAILURE, payload: data.message });
                }
            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILURE, payload: error.message });
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch({ type: LOGOUT_REQUEST });
        request('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: refreshToken })
        })
            .then(data => {
                if (data.success) {
                    dispatch({ type: LOGOUT_SUCCESS });
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('accessToken');
                } else {
                    dispatch({ type: LOGOUT_FAILURE, payload: data.message });
                }
            })
            .catch(error => {
                dispatch({ type: LOGOUT_FAILURE, payload: error.message });
            });
    };
};

export const refreshToken = () => {
    return (dispatch) => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;
        dispatch({ type: TOKEN_REFRESH_REQUEST });
        return request('/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
        })
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: TOKEN_REFRESH_SUCCESS,
                        payload: { accessToken: data.accessToken, refreshToken: data.refreshToken },
                    });
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                } else {
                    dispatch({ type: TOKEN_REFRESH_FAILURE, payload: data.message });
                }
            })
            .catch(error => {
                dispatch({ type: TOKEN_REFRESH_FAILURE, payload: error.message });
            });
    };
};

export const markForgotPasswordVisited = () => ({
    type: FORGOT_PASSWORD_VISITED
});
