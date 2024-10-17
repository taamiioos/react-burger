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
import {request} from '../../api/request-response';
import {TIngredientsActionTypes} from "./../types/ingredients-types";
import {IIngredient} from './../../components/types/components-types';

export const incrementIngredientCount = (ingredientId: string): TIngredientsActionTypes => ({
    type: INCREMENT_INGREDIENT_COUNT,
    payload: ingredientId,
});

export const decrementIngredientCount = (ingredientId: string): TIngredientsActionTypes => ({
    type: DECREMENT_INGREDIENT_COUNT,
    payload: ingredientId,
});

export const setCurrentIngredient = (ingredient: IIngredient): TIngredientsActionTypes => ({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient,
});

export const clearCurrentIngredient = (): TIngredientsActionTypes => ({
    type: CLEAR_CURRENT_INGREDIENT,
});

export const setTab = (tab: string): TIngredientsActionTypes => ({
    type: SET_TAB,
    payload: tab,
});

export const setIngredients = () => {
    return async (dispatch: React.Dispatch<TIngredientsActionTypes>) => {
        dispatch({type: INGREDIENTS_REQUEST});
        try {
            const res = await request('/ingredients');
            dispatch({
                type: INGREDIENTS_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: INGREDIENTS_ERROR,
                payload: (error as Error).message,
            });
            console.error(`Ошибочка при запросе: ${error}`);
        }
    };
};
