import {
    SET_TAB,
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT,
    INCREMENT_INGREDIENT_COUNT,
    DECREMENT_INGREDIENT_COUNT,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_ERROR,
    RESET_INGREDIENT_COUNT
} from './../actions/action-types';
import {TIngredientsActionTypes, IIngredientsState} from "../types/ingredients-types";

const initialState: IIngredientsState = {
    ingredients: [],
    currentIngredient: null,
    useTab: "Булки",
    request: false,
    failed: false,
    error: ''
};

const ingredientsReducer = (state = initialState, action: TIngredientsActionTypes): IIngredientsState => {
    switch (action.type) {
        case INGREDIENTS_REQUEST:
            return {
                ...state, request: true, failed: false, error: ''
            };
        case INGREDIENTS_SUCCESS:
            return {
                ...state, ingredients: action.payload, request: false, failed: false, error: ''
            };
        case INGREDIENTS_ERROR:
            return {
                ...state, request: false, failed: true, error: action.payload
            };
        case SET_CURRENT_INGREDIENT:
            return {
                ...state, currentIngredient: action.payload,
            };
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ...state, currentIngredient: null,
            };
        case SET_TAB:
            return {
                ...state, useTab: action.payload,
            };
        case INCREMENT_INGREDIENT_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient =>
                    ingredient._id === action.payload ? {
                        ...ingredient,
                        count: (ingredient.count ?? 0) + 1
                    } : ingredient
                ),
            };
        case DECREMENT_INGREDIENT_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient =>
                    ingredient._id === action.payload && (ingredient.count ?? 0) > 0 ? {
                        ...ingredient,
                        count: (ingredient.count ?? 0) - 1
                    } : ingredient
                ),
            };
        case RESET_INGREDIENT_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient => ({
                    ...ingredient,
                    count: 0
                }))
            };
        default:
            return state;
    }
};

export default ingredientsReducer;
