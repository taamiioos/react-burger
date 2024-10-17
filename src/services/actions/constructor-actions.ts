import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REPLACE_BUN,
    SET_PRICE,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from './action-types';
import {v4 as uuidv4} from 'uuid';
import {TConstructorActionTypes} from "./../types/constructor-types";
import {IIngredient} from './../../components/types/components-types';

export const addIngredient = (item: IIngredient): TConstructorActionTypes => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            item: {...item, uniqueId: uuidv4()},
        }
    };
};

export const clearConstructor = (): TConstructorActionTypes => {
    return {
        type: CLEAR_CONSTRUCTOR
    };
};

export const removeIngredient = (index: number): TConstructorActionTypes => ({
    type: REMOVE_INGREDIENT,
    payload: index
});

export const replaceBun = (bun: IIngredient): TConstructorActionTypes => ({
    type: REPLACE_BUN,
    payload: bun
});

export const setPrice = (price: number): TConstructorActionTypes => ({
    type: SET_PRICE,
    payload: price
});

export const moveIngredient = (dragIndex: number, hoverIndex: number): TConstructorActionTypes => ({
    type: MOVE_INGREDIENT,
    payload: {dragIndex, hoverIndex}
});
