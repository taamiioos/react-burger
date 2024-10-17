import React, {useEffect} from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modal/order-details/order-details';
import {useModal} from '../../hooks/use-modal';
import Modal from '../modal/modal';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {
    addIngredient,
    removeIngredient,
    replaceBun,
    setPrice,
    moveIngredient,
    clearConstructor
} from '../../services/actions/constructor-actions';
import {makeOrder} from '../../services/actions/order-actions';
import {decrementIngredientCount, incrementIngredientCount} from '../../services/actions/ingredients-actions';
import DraggableIngredient from './draggable-ingredient';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../../services/reducers/root-reducer';
import {AppDispatch} from '../../services/store';
import {IIngredient} from './../types/components-types';

const useAppDispatch = () => useDispatch<AppDispatch>();

const BurgerConstructor: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {bun, ingredients, price} = useSelector((state: RootState) => state.constructorIngredients);
    const {isModalOpen, openModal, closeModal} = useModal();
    const {orderNumber, orderRequest, orderFailed} = useSelector((state: RootState) => state.order);
    const {isAuth} = useSelector((state: RootState) => state.authUser);

    const handleOrder = () => {
        if (!isAuth) {
            navigate("/login", {state: {from: "/"}});
            return;
        }
        const ingredientIds = ingredients.map(ingredient => ingredient._id);
        dispatch(makeOrder(ingredientIds))
            .then(() => {
                dispatch(clearConstructor());
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (orderNumber && !orderRequest && !orderFailed) {
            openModal();
        }
    }, [orderNumber, orderRequest, orderFailed, openModal]);

    const totalPrice = React.useMemo(() => {
        let totalPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
        if (bun) {
            totalPrice += bun.price * 2;
        }
        return totalPrice;
    }, [ingredients, bun]);

    useEffect(() => {
        dispatch(setPrice(totalPrice));
    }, [totalPrice, dispatch]);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: IIngredient) {
            if (item.type === 'bun') {
                if (bun) {
                    dispatch(decrementIngredientCount(bun._id));
                }
                dispatch(replaceBun(item));
                dispatch(incrementIngredientCount(item._id));
            } else {
                dispatch(addIngredient(item));
                dispatch(incrementIngredientCount(item._id));
            }
        },
    });

    const handleRemoveIngredient = (index: number, ingredientId: string) => {
        dispatch(removeIngredient(index));
        dispatch(decrementIngredientCount(ingredientId));
    };

    const handleMoveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    };

    return (
        <div className={burgerConstructorStyles.container} ref={dropTarget}>
            <div className={burgerConstructorStyles.burgerComponents}>
                {bun && (
                    <div className={burgerConstructorStyles.elementRow}>
                        <div className={burgerConstructorStyles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    </div>
                )}

                <section className={burgerConstructorStyles.burgerScroll}>
                    {ingredients.map((ingredient: IIngredient, index: number) => (
                        <DraggableIngredient
                            key={ingredient.uniqueId}
                            index={index}
                            ingredient={ingredient}
                            moveIngredient={handleMoveIngredient}
                            handleRemoveIngredient={handleRemoveIngredient}
                        />
                    ))}
                </section>

                {bun && (
                    <div className={burgerConstructorStyles.elementRow}>
                        <div className={burgerConstructorStyles.bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className={burgerConstructorStyles.priceComponents}>
                <span className={`${burgerConstructorStyles.iconBlock} text text_type_digits-medium`}>
                    {price}
                    <span><CurrencyIcon type="primary"/></span>
                </span>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOrder}
                    disabled={orderRequest || !bun}
                >
                    {orderRequest ? <ClipLoader/> : 'Оформить заказ'}
                </Button>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal} title={""}>
                    <OrderDetails/>
                </Modal>
            )}
        </div>
    );
};

export default BurgerConstructor;
