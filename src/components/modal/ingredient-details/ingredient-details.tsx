import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import {RootState} from '../../../services/reducers/root-reducer';

const IngredientDetails: React.FC = () => {
    const { id } = useParams();
    const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
    const ingredient = ingredients.find((item) => item._id === id);

    if (!ingredient) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.modalContent}>
            <div>
                <div className={styles.imageContainer}>
                    <img className={styles.ingredientImage} src={ingredient.image} alt={ingredient.name} />
                </div>
                <h3 className={`${styles.ingredientName} text text_type_main-medium`}>{ingredient.name}</h3>
                <ul className={styles.characteristics}>
                    <li className={styles.item}>
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`}>Калории, ккал</span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</span>
                    </li>
                    <li className={styles.item}>
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`}>Белки, г</span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</span>
                    </li>
                    <li className={styles.item}>
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`}>Жиры, г</span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</span>
                    </li>
                    <li className={styles.item}>
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default IngredientDetails;
