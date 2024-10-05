import React, { useEffect } from "react";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import { useModal } from '../../hooks/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentIngredient, setTab} from '../../services/actions/ingredients-actions';
import Ingredient from './ingredient';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredients, useTab } = useSelector((state) => state.ingredients);
    const {openModal, closeModal } = useModal();
    const { id } = useParams();
    const { ref: bunsRef, inView: bunsInView } = useInView({ threshold: 0 });
    const { ref: saucesRef, inView: saucesInView } = useInView({ threshold: 0 });
    const { ref: fillingsRef, inView: fillingsInView } = useInView({ threshold: 0 });

    const handleModalOpen = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        openModal(true);
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
    };
    useEffect(() => {
        if (id) {
            const ingredient = ingredients.find((ing) => ing._id === id);
            if (ingredient) {
                dispatch(setCurrentIngredient(ingredient));
                openModal(true);
            }
        }
    }, [id, ingredients, dispatch, openModal]);

    useEffect(() => {
        if (bunsInView) dispatch(setTab("Булки"));
        else if (saucesInView) dispatch(setTab("Соусы"));
        else if (fillingsInView) dispatch(setTab("Начинки"));
    }, [bunsInView, saucesInView, fillingsInView, dispatch]);

    const handleTabChange = (tab) => {
        dispatch(setTab(tab));
        const ref = tab === "Булки" ? bunsRef : tab === "Соусы" ? saucesRef : fillingsRef;
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={burgerStyles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={burgerStyles.tabs}>
                <button
                    className={useTab === "Булки" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Булки")}>
                    Булки
                </button>
                <button
                    className={useTab === "Соусы" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Соусы")}>
                    Соусы
                </button>
                <button
                    className={useTab === "Начинки" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Начинки")}>
                    Начинки
                </button>
            </div>
            <div className={burgerStyles.tabContent}>
                <div className={burgerStyles.ingredients}>
                    <h2 ref={bunsRef}>Булки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "bun").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                        />
                    ))}
                    <h2 ref={saucesRef}>Соусы</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "sauce").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                        />
                    ))}
                    <h2 ref={fillingsRef}>Начинки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "main").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BurgerIngredients;
