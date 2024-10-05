import {
    SET_TAB,
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT,
    INCREMENT_INGREDIENT_COUNT,
    DECREMENT_INGREDIENT_COUNT,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_ERROR
} from './action-types';
import {request} from '../../api/request-response'

export const incrementIngredientCount = (ingredientId) => ({
    type: INCREMENT_INGREDIENT_COUNT, payload: ingredientId,
});

export const decrementIngredientCount = (ingredientId) => ({
    type: DECREMENT_INGREDIENT_COUNT, payload: ingredientId,
});

export const setCurrentIngredient = (ingredient) => ({
    type: SET_CURRENT_INGREDIENT, payload: ingredient,
});

export const clearCurrentIngredient = () => ({
    type: CLEAR_CURRENT_INGREDIENT,
});

export const setTab = (tab) => ({
    type: SET_TAB, payload: tab,
});
export const setIngredients = () => {
    return (dispatch) => {
        dispatch({type: INGREDIENTS_REQUEST});
        request('/ingredients')
            .then(res => {
                dispatch({
                    type: INGREDIENTS_SUCCESS, payload: res.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: INGREDIENTS_ERROR, payload: error.message
                });
                console.log(`Ошибочка при запросе: ${error}`);
            });
    };
};