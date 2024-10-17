import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, RESET_INGREDIENT_COUNT} from './action-types';
import {request} from '../../api/request-response';
import {
    TOrderActionTypes
} from './../types/order-types';

export const makeOrder = (ingredients: string[]) => {
    return async (dispatch: React.Dispatch<TOrderActionTypes>) => {
        dispatch({type: ORDER_REQUEST});
        try {
            const data = await request('/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients}),
            });
            dispatch({
                type: ORDER_SUCCESS,
                payload: data.order.number,
            });
            dispatch({type: RESET_INGREDIENT_COUNT});
        } catch (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: (error as Error).message,
            });
            console.error(`Ошибка: ${(error as Error).message}`);
            throw error;
        }
    };
};