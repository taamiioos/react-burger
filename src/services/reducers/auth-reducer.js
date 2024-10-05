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
} from './../actions/action-types';

const initialState = {
    isAuth: !!localStorage.getItem('accessToken'),
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    error: null,
    successRegister: false,
    successLogin: false,
    successLogout: false,
    successToken: false,
    emailLogin: "",
    passwordLogin: "",
    emailRegister: "",
    passwordRegister: "",
    nameRegister: "",
    hasVisitedForgotPassword: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_VISITED:
            return {
                ...state,
                hasVisitedForgotPassword: true
            };

        case SET_EMAIL_LOGIN:
            return {
                ...state,
                emailLogin: action.payload,
                error: null,

            };
        case SET_PASSWORD_LOGIN:
            return {
                ...state,
                passwordLogin: action.payload,
                error: null,

            };
        case SET_EMAIL_REGISTER:
            return {
                ...state,
                emailRegister: action.payload,
                error: null,
            };
        case SET_PASSWORD_REGISTER:
            return {
                ...state,
                passwordRegister: action.payload,
                error: null,
            };
        case SET_NAME_REGISTER:
            return {
                ...state,
                nameRegister: action.payload,
                error: null,
            };

        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case TOKEN_REFRESH_REQUEST:
            return {
                ...state,
                error: null,
                successRegister: false,
                successLogin: false,
                successLogout: false,
                successToken: false,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                successRegister: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isAuth: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                successLogin: true,
                error: null,

            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuth: false,
                accessToken: null,
                refreshToken: null,
                successLogout: true,
                error: null,

            };
        case TOKEN_REFRESH_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                successToken: true,
                error: null,

            };

        case REGISTER_FAILURE:
            return {
                error: action.payload
            }
        case LOGIN_FAILURE:
            return {
                error: action.payload
            }
        case LOGOUT_FAILURE:
        case TOKEN_REFRESH_FAILURE:
            return {
                ...state,
                error: action.payload,
                successRegister: false,
                successLogin: false,
                successLogout: false,
                successToken: false
            };

        default:
            return state;
    }
};

export default authReducer;
