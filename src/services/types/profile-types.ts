import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from '../actions/action-types';

interface IGetUserRequestAction {
    type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: {
        email: string;
        name: string;
    };
}

interface IGetUserFailureAction {
    type: typeof GET_USER_FAILURE;
    payload: string;
}

interface IUpdateUserRequestAction {
    type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccessAction {
    type: typeof UPDATE_USER_SUCCESS;
    payload: {
        email: string;
        name: string;
    };
}

interface IUpdateUserFailureAction {
    type: typeof UPDATE_USER_FAILURE;
    payload: string;
}

export type TProfileActionTypes =
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailureAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailureAction;

export interface IProfileState {
    email: string;
    name: string;
    error: string | null;
    successGet: boolean;
    successPatch: boolean;
}
