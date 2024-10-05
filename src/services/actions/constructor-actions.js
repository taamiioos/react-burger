import {
    ADD_INGREDIENT, REMOVE_INGREDIENT, REPLACE_BUN, SET_PRICE, MOVE_INGREDIENT, CLEAR_CONSTRUCTOR
} from './action-types';
import {v4 as uuidv4} from 'uuid';

export const addIngredient = (item) => {
    return {
        type: ADD_INGREDIENT, payload: {
            ...item, uniqueId: uuidv4()}};};
export const clearConstructor = () => {
    return {
        type: CLEAR_CONSTRUCTOR};};

export const removeIngredient = (index) => ({
    type: REMOVE_INGREDIENT, payload: index
});
export const replaceBun = (bun) => ({
    type: REPLACE_BUN, payload: bun
});
export const setPrice = (price) => ({
    type: SET_PRICE, payload: price
});
export const moveIngredient = (dragIndex, hoverIndex) => ({
    type: MOVE_INGREDIENT, payload: {dragIndex, hoverIndex}
});
