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
    FORGOT_PASSWORD_VISITED,

} from './../actions/action-types';

interface ISetEmailRegisterAction {
    type: typeof SET_EMAIL_REGISTER;
    payload: string;
}

interface ISetPasswordRegisterAction {
    type: typeof SET_PASSWORD_REGISTER;
    payload: string;
}

interface ISetNameRegisterAction {
    type: typeof SET_NAME_REGISTER;
    payload: string;
}

interface ISetEmailLoginAction {
    type: typeof SET_EMAIL_LOGIN;
    payload: string;
}

interface ISetPasswordLoginAction {
    type: typeof SET_PASSWORD_LOGIN;
    payload: string;
}

interface IRegisterRequestAction {
    type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: {
        user: any;
        accessToken: string;
        refreshToken: string;
    };
}

interface IRegisterFailureAction {
    type: typeof REGISTER_FAILURE;
    payload: string;
}

interface ILoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
        user: any;
        accessToken: string;
        refreshToken: string;
    };
}

interface ILoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

interface ILogoutRequestAction {
    type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailureAction {
    type: typeof LOGOUT_FAILURE;
    payload: string;
}

interface ITokenRefreshRequestAction {
    type: typeof TOKEN_REFRESH_REQUEST;
}

interface ITokenRefreshSuccessAction {
    type: typeof TOKEN_REFRESH_SUCCESS;
    payload: {
        accessToken: string;
        refreshToken: string;
    };
}

interface ITokenRefreshFailureAction {
    type: typeof TOKEN_REFRESH_FAILURE;
    payload: string;
}

interface IForgotPasswordVisitedAction {
    type: typeof FORGOT_PASSWORD_VISITED;
}

export type TAuthActionTypes =
    | ISetEmailRegisterAction
    | ISetPasswordRegisterAction
    | ISetNameRegisterAction
    | ISetEmailLoginAction
    | ISetPasswordLoginAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailureAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailureAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailureAction
    | ITokenRefreshRequestAction
    | ITokenRefreshSuccessAction
    | ITokenRefreshFailureAction
    | IForgotPasswordVisitedAction;

export interface IAuthState {
    isAuth: boolean;
    user: any;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
    successRegister: boolean;
    successLogin: boolean;
    successLogout: boolean;
    successToken: boolean;
    emailLogin: string;
    passwordLogin: string;
    emailRegister: string;
    passwordRegister: string;
    nameRegister: string;
    hasVisitedForgotPassword: boolean;
};