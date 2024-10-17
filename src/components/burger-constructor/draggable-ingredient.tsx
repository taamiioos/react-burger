import React, {useRef} from "react";
import {useDrag, useDrop} from 'react-dnd';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from "./burger-constructor.module.css";
import {IDraggableIngredientProps} from './../types/components-types';

const DraggableIngredient: React.FC<IDraggableIngredientProps> = ({
                                                                     ingredient,
                                                                     index,
                                                                     moveIngredient,
                                                                     handleRemoveIngredient
                                                                 }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'constructor-ingredient',
        hover(item: { index: number }) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex !== hoverIndex) {
                moveIngredient(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
        },
    });

    const [, drag] = useDrag({
        type: 'constructor-ingredient',
        item: {...ingredient, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));


    return (
        <div ref={ref} className={burgerConstructorStyles.elementRow}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleRemoveIngredient(index, ingredient._id)}
            />
        </div>
    );
};


export default DraggableIngredient;
