import React from 'react';
import styles from './order-details.module.css';
import img from '../../../images/img.png'
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/reducers/root-reducer';

const OrderDetails: React.FC = () => {
    const orderNumber = useSelector((state: RootState) => state.order.orderNumber)
    return (
        <div className={styles.modalContent}>
            <span className={`${styles.numOrderStyle} text text_type_digits-large`}>{orderNumber}</span>
            <span className={`${styles.idOrder}text text_type_main-medium`}>идентификатор заказа</span>
            <img src={img} className={styles.orderImageStyle} alt='Заказ принят'></img>
            <span className={`${styles.textStyle1} text text_type_main-default`}>Ваш заказ начали готовить</span>
            <span className={`${styles.textStyle2} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
        </div>
    );
};

export default OrderDetails;
