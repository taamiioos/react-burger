import styles from './reset-password.module.css';
import React, {useEffect} from "react";
import {
    Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordRequest, setPasswordReset, setCodeReset} from '../../../services/actions/password-actions';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {code, password, successReset} = useSelector(state => state.passwordForgot);

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(resetPasswordRequest(password, code));
    };
    useEffect(() => {
        if (successReset) {
            navigate('/login');
        }
    }, [successReset, navigate]);
    return (<div className={styles.container}>
            <div className={styles.noRegister}>
                <span className={styles.header}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                </span>
                <form onSubmit={submitForm}>
                    <div className={styles.inputs}>
                        <PasswordInput
                            placeholder={'Введите новый пароль'}
                            name={'password'}
                            value={password}
                            onChange={(e) => dispatch(setPasswordReset(e.target.value))}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            name={'code'}
                            value={code}
                            onChange={(e) => dispatch(setCodeReset(e.target.value))}
                        />
                    </div>
                    <div className={styles.buttonRegister}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
            <div className={styles.ifRegister}>
                <p>Вспомнили пароль
                    <Link to={'/login'} className={styles.link}>
                        Войти
                    </Link></p>
            </div>
        </div>);
}

export default ResetPassword;
