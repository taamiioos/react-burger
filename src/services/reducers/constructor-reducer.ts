import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REPLACE_BUN,
    SET_PRICE,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from '../actions/action-types';

import {TConstructorActionTypes, IConstructorState} from "../types/constructor-types";

const initialState: IConstructorState = {
    bun: null,
    ingredients: [],
    price: 0
};

const constructorReducer = (state = initialState, action: TConstructorActionTypes): IConstructorState => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, {...action.payload.item, count: 1}],
            };
        }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((_, index) => index !== action.payload),
            };
        case REPLACE_BUN:
            return {
                ...state,
                bun: action.payload,
            };
        case SET_PRICE:
            return {
                ...state,
                price: action.payload,
            };
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                bun: null,
                ingredients: [],
                price: 0
            };
        }
        case MOVE_INGREDIENT: {
            const {dragIndex, hoverIndex} = action.payload;
            const newIngredients = [...state.ingredients];
            const [movedItem] = newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, movedItem);
            return {
                ...state,
                ingredients: newIngredients,
            };
        }
        default:
            return state;
    }
};

export default constructorReducer;
