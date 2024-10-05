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
} from '../actions/action-types';

const initialState = {
    email: '',
    password: '',
    code: '',
    error: null,
    successForgot: false,
    successReset: false

};
export const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                error: null,
                successForgot: false
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                successForgot: true
            };
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                successForgot: false
            };
        case SET_EMAIL_FORGOT:
            return {
                ...state,
                email: action.payload
            };
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                error: null,
                successReset: false
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                successReset: true
            };
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                successReset: false
            };
        case SET_PASSWORD_RESET:
            return {
                ...state,
                password: action.payload
            };
        case SET_CODE_RESET:
            return {
                ...state,
                code: action.payload
            };
        default:
            return state;
    }
};
export default passwordReducer;