import styles from './forgot-password.module.css';
import React, {useEffect} from "react";
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest, setEmailForgot } from '../../../services/actions/password-actions';
import { markForgotPasswordVisited} from '../../../services/actions/auth-actions';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {successForgot, email } = useSelector(state => state.passwordForgot);
    useEffect(() => {
        dispatch(markForgotPasswordVisited());
    }, [dispatch]);
    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest(email));
    }
    useEffect(() => {
        if (successForgot) {
            navigate('/reset-password');
        }
    }, [successForgot, navigate]);
    return (
        <div className={styles.container}>
            <div className={styles.noRegister}>
                <span className={styles.header}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                </span>
                <form onSubmit={submitForm}>
                    <div className={styles.inputs}>
                        <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            name={'email'}
                            value={email}
                            onChange={(e) => {
                                dispatch(setEmailForgot(e.target.value));
                            }}
                        />
                    </div>
                    <div className={styles.buttonRegister}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                        >
                            Восстановить
                        </Button>
                    </div>
                </form>
            </div>
            <div className={styles.ifRegister}>
                <p>Вспомнили пароль?
                    <Link to={'/login'} className={styles.link}>
                        Войти
                    </Link></p>
            </div>
        </div>
    );
}

export default ForgotPassword;
