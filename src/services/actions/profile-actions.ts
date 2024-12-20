import { ActionTypes } from '../types/profile-types';
import { request } from '../../api/request-response';
import { refreshToken } from "./auth-actions";
import { AppThunk, AppDispatch } from '../store';

export const getUser = (): AppThunk<Promise<void>> => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: ActionTypes.GET_USER_REQUEST });
        const token = localStorage.getItem('accessToken') || "";
        try {
            const data = await request('/auth/user', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                }
            });

            if (data.success) {
                dispatch({ type: ActionTypes.GET_USER_SUCCESS, payload: { email: data.user.email, name: data.user.name } });
            } else if (data.message === 'jwt expired' || data.status === 403) {
                dispatch(refreshToken());
                return dispatch(getUser());
            } else {
                dispatch({ type: ActionTypes.GET_USER_FAILURE, payload: data.message });
            }
        } catch (error) {
            dispatch({ type: ActionTypes.GET_USER_FAILURE, payload: (error as Error).message });
        }
    };
};

export const updateUser = (name: string, email: string): AppThunk<Promise<void>> => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: ActionTypes.UPDATE_USER_REQUEST });
        const token = localStorage.getItem('accessToken') || "";
        try {
            const data = await request('/auth/user', {
                method: 'PATCH',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            if (data.success) {
                dispatch({
                    type: ActionTypes.UPDATE_USER_SUCCESS,
                    payload: { email: data.user.email, name: data.user.name }
                });
            } else if (data.message === 'jwt expired' || data.status === 403) {
                dispatch(refreshToken());
                return dispatch(updateUser(name, email));
            } else {
                dispatch({ type: ActionTypes.UPDATE_USER_FAILURE, payload: data.message });
            }

        } catch (error) {
            dispatch({ type: ActionTypes.UPDATE_USER_FAILURE, payload: (error as Error).message });
        }
    };
};
