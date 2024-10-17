import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REPLACE_BUN,
    SET_PRICE,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from '../actions/action-types';

import {IIngredient} from './../../components/types/components-types';

interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT;
    payload: {
        item: IIngredient & { uniqueId: string };
    };
}

interface IRemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT;
    payload: number; 
}

interface IReplaceBunAction {
    type: typeof REPLACE_BUN;
    payload: IIngredient; 
}

interface ISetPriceAction {
    type: typeof SET_PRICE;
    payload: number; 
}

interface IMoveIngredientAction {
    type: typeof MOVE_INGREDIENT;
    payload: {
        dragIndex: number;
        hoverIndex: number; 
    };
}

interface IClearConstructorAction {
    type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActionTypes =
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IReplaceBunAction
    | ISetPriceAction
    | IMoveIngredientAction
    | IClearConstructorAction;

export interface IConstructorState {
    bun: IIngredient | null;
    ingredients: IIngredient[]; 
    price: number; 
    count?: number; 
}
