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
import {IIngredient} from './../../components/types/components-types';

interface ISetTabAction {
    type: typeof SET_TAB;
    payload: string;
}

interface ISetCurrentIngredientAction {
    type: typeof SET_CURRENT_INGREDIENT;
    payload: IIngredient;
}

interface IClearCurrentIngredientAction {
    type: typeof CLEAR_CURRENT_INGREDIENT;
}

interface IIncrementIngredientCountAction {
    type: typeof INCREMENT_INGREDIENT_COUNT;
    payload: string;
}

interface IDecrementIngredientCountAction {
    type: typeof DECREMENT_INGREDIENT_COUNT;
    payload: string;
}

interface IIngredientsRequestAction {
    type: typeof INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
    type: typeof INGREDIENTS_SUCCESS;
    payload: any[];
}

interface IIngredientsErrorAction {
    type: typeof INGREDIENTS_ERROR;
    payload: string;
}

interface IResetIngredientCountAction {
    type: typeof RESET_INGREDIENT_COUNT;
}

export type TIngredientsActionTypes =
    | ISetTabAction
    | ISetCurrentIngredientAction
    | IClearCurrentIngredientAction
    | IIncrementIngredientCountAction
    | IDecrementIngredientCountAction
    | IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsErrorAction
    | IResetIngredientCountAction;

export interface IIngredientsState {
    ingredients: IIngredient[];
    currentIngredient: IIngredient | null;
    useTab: string;
    request: boolean;
    failed: boolean;
    error: string;
}
