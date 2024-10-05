import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, RESET_INGREDIENT_COUNT} from './action-types';
import {request} from '../../api/request-response';

export const makeOrder = (ingredients) => {
    return (dispatch) => {
        dispatch({type: ORDER_REQUEST});
        return request('/orders', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ingredients}),
        })
            .then((data) => {
                dispatch({
                    type: ORDER_SUCCESS, payload: data.order.number,
                });
                dispatch({type: RESET_INGREDIENT_COUNT});
            })
            .catch((error) => {
                dispatch({
                    type: ORDER_ERROR, payload: error.message,
                });
                console.error(`Ошибка: ${error.message}`);
                throw error;
            });
    };
};
