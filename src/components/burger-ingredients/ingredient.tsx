import React from "react";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from 'react-dnd';
import {IIngredientProps} from './../types/components-types';

const Ingredient: React.FC<IIngredientProps> = ({ingredient, handleModalOpen}) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <div
            className={burgerStyles.ingredientItem}
            ref={dragRef}
            onClick={() => handleModalOpen(ingredient)} 
        >
            <img src={ingredient.image} alt={ingredient.name}/>

            {ingredient.count && ingredient.count > 0 && (
                <Counter count={ingredient.count} size="default" extraClass="m-1"/>
            )}

            <span className={burgerStyles.priceBlock}>
                <p>{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </span>

            <p>{ingredient.name}</p>
        </div>
    );
};

export default Ingredient;
