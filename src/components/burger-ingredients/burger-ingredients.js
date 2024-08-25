import React, {useEffect} from "react";
import PropTypes from "prop-types";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({ingredients}) => {
    const [useTab, setUseTab] = React.useState("Булки");

    const bunsRef = React.useRef(null);
    const saucesRef = React.useRef(null);
    const fillingsRef = React.useRef(null);

    const handleTabChange = (tab) => {
        setUseTab(tab);
        if (tab === "Булки" && bunsRef.current) {
            bunsRef.current.scrollIntoView({behavior: "smooth"});
        } else if (tab === "Соусы" && saucesRef.current) {
            saucesRef.current.scrollIntoView({behavior: "smooth"});
        } else if (tab === "Начинки" && fillingsRef.current) {
            fillingsRef.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const handleScroll = () => {
        const saucesTop = saucesRef.current.getBoundingClientRect().top;
        const fillingsTop = fillingsRef.current.getBoundingClientRect().top;
        if (fillingsTop < 150) {
            setUseTab("Начинки");
        } else if (saucesTop < 150) {
            setUseTab("Соусы");
        } else {
            setUseTab("Булки");
        }
    };

    useEffect(() => {
        const container = document.querySelector(`.${burgerStyles.ingredients}`);
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                        <div key={ingredient._id} className={burgerStyles.ingredientItem}>
                            <img src={ingredient.image} alt={ingredient.name}/>
                            {(ingredient._id === "60666c42cc7b410027a1a9b1") && (
                                <Counter count={1} size="default" extraClass="m-1"/>
                            )}
                            <span style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                                    <p>{ingredient.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </span>
                            <p>{ingredient.name}</p>
                        </div>
                    ))}

                    <h2 ref={saucesRef}>Соусы</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "sauce").map((ingredient) => (
                        <div key={ingredient._id} className={burgerStyles.ingredientItem}>
                            <img src={ingredient.image} alt={ingredient.name}/>
                            <span style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                                    <p>{ingredient.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </span>
                            <p>{ingredient.name}</p>
                        </div>
                    ))}

                    <h2 ref={fillingsRef}>Начинки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "main").map((ingredient) => (
                        <div key={ingredient._id} className={burgerStyles.ingredientItem}>
                            <img src={ingredient.image} alt={ingredient.name}/>
                            <span style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                                    <p>{ingredient.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </span>
                            <p>{ingredient.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            calories: PropTypes.number,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
        })
    ).isRequired,
};

export default BurgerIngredients;