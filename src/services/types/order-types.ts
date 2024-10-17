import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, RESET_INGREDIENT_COUNT} from './../actions/action-types';

interface IOrderRequestAction {
    type: typeof ORDER_REQUEST;
}

interface IOrderSuccessAction {
    type: typeof ORDER_SUCCESS;
    payload: number;
}

interface IOrderErrorAction {
    type: typeof ORDER_ERROR;
    payload: string;
}

interface IResetIngredientCountAction {
    type: typeof RESET_INGREDIENT_COUNT;
}

export type TOrderActionTypes =
    | IOrderRequestAction
    | IOrderSuccessAction
    | IOrderErrorAction
    | IResetIngredientCountAction;

export interface IOrderState {
    orderNumber: number | null;
    orderRequest: boolean;
    orderFailed: boolean;
    error: string;
}