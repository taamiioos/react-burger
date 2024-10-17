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

interface IForgotPasswordRequestAction {
    type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccessAction {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    payload: any;
}

interface IForgotPasswordErrorAction {
    type: typeof FORGOT_PASSWORD_ERROR;
    payload: any;
}

interface IResetPasswordRequestAction {
    type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccessAction {
    type: typeof RESET_PASSWORD_SUCCESS;
    payload: any;
}

interface IResetPasswordErrorAction {
    type: typeof RESET_PASSWORD_ERROR;
    payload: any;
}

interface ISetEmailForgotAction {
    type: typeof SET_EMAIL_FORGOT;
    payload: string;
}

interface ISetPasswordResetAction {
    type: typeof SET_PASSWORD_RESET;
    payload: string;
}

interface ISetCodeResetAction {
    type: typeof SET_CODE_RESET;
    payload: string;
}

export type TPasswordActionTypes =
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordErrorAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordErrorAction
    | ISetEmailForgotAction
    | ISetPasswordResetAction
    | ISetCodeResetAction;

export interface IPasswordState {
    email: string;
    password: string;
    code: string;
    error: any | null;
    successForgot: boolean;
    successReset: boolean;
}
