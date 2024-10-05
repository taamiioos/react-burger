import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from '../actions/action-types';

const initialState = {
    email: "",
    name: "",
    error: null,
    successGet: false,
    successPatch: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                successGet: false,
                error: null,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                successGet: true,
                email: action.payload.email,
                name: action.payload.name,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                successGet: false,
                error: action.payload,
            };
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                successPatch: false,
                error: null,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                successPatch: true,
                email: action.payload.email,
                name: action.payload.name,
            };
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                successPatch: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default profileReducer;
