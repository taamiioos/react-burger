import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from '../actions/action-types';
import { request } from '../../api/request-response';
import {refreshToken} from "./auth-actions";
import {ThunkProfileAction} from './../reducers/root-reducer';

export const getUser = (): ThunkProfileAction => {
    return (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        const token = localStorage.getItem('accessToken') || "";

        return request('/auth/user', {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
            .then(data => {
                if (data.success) {
                    dispatch({ type: GET_USER_SUCCESS, payload: { email: data.user.email, name: data.user.name } });
                } else {
                    if (data.message === 'jwt expired' || data.status === 403) {
                        return dispatch(refreshToken()).then(() => {
                            return dispatch(getUser());
                        });
                    } else {
                        dispatch({ type: GET_USER_FAILURE, payload: data.message });
                    }
                }
            })
            .catch(error => {
                dispatch({ type: GET_USER_FAILURE, payload: error.message });
            });
    };
};
export const updateUser = (name: string, email: string): ThunkProfileAction => {
    return (dispatch) => {
        dispatch({ type: UPDATE_USER_REQUEST });
        const token = localStorage.getItem('accessToken') || "";

        return request('/auth/user', {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then(data => {
                if (data.success) {
                    dispatch({ type: UPDATE_USER_SUCCESS, payload: { email: data.user.email, name: data.user.name } });
                } else {
                    if (data.message === 'jwt expired' || data.status === 403) {
                        return dispatch(refreshToken()).then(() => {
                            return dispatch(updateUser(name, email));
                        });
                    } else {
                        dispatch({ type: UPDATE_USER_FAILURE, payload: data.message });
                    }
                }
            })
            .catch(error => {
                dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
            });
    };
};
