import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR} from './../actions/action-types';
import {
    TOrderActionTypes, IOrderState
} from './../types/order-types';

const initialState: IOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    error: ''
};

const orderReducer = (state = initialState, action: TOrderActionTypes): IOrderState => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                error: ''
            };
        case ORDER_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload,
                orderRequest: false,
                orderFailed: false
            };
        case ORDER_ERROR:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;