import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    SET_EMAIL_FORGOT,
    SET_PASSWORD_RESET,
    SET_CODE_RESET
} from './action-types';
import { request } from '../../api/request-response';
import { TPasswordActionTypes } from "./../types/password-types";

export const forgotPasswordRequest = (email: string) => {
    return async (dispatch: React.Dispatch<TPasswordActionTypes>) => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        try {
            const data = await request('/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            if (data.success) {
                dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
                console.log('Запрос на сброс пароля прошел успешно');
            } else {
                dispatch({ type: FORGOT_PASSWORD_ERROR, payload: data });
                console.log('Запрос на сброс пароля прошел с ошибкой');
            }
        } catch (error) {
            dispatch({ type: FORGOT_PASSWORD_ERROR, payload: error });
        }
    };
};

export const resetPasswordRequest = (password: string, token: string) => {
    return async (dispatch: React.Dispatch<TPasswordActionTypes>) => {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        try {
            const data = await request('/password-reset/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, token })
            });
            if (data.success) {
                dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
                console.log('Сброс пароля прошел успешно');
            } else {
                dispatch({ type: RESET_PASSWORD_ERROR, payload: data });
                console.log('Сброс пароля прошел неудачно');
            }
        } catch (error) {
            dispatch({ type: RESET_PASSWORD_ERROR, payload: error });
        }
    };
};

export const setEmailForgot = (email: string): TPasswordActionTypes => ({
    type: SET_EMAIL_FORGOT, payload: email
});

export const setPasswordReset = (password: string): TPasswordActionTypes => ({
    type: SET_PASSWORD_RESET, payload: password
});

export const setCodeReset = (code: string): TPasswordActionTypes => ({
    type: SET_CODE_RESET, payload: code
});