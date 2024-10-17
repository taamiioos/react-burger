import styles from './reset-password.module.css';
import React, {useEffect} from "react";
import {
    Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordRequest, setPasswordReset, setCodeReset} from '../../../services/actions/password-actions';
import {RootState} from '../../../services/reducers/root-reducer';
import {AppDispatch} from '../../../services/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {code, password, successReset} = useSelector((state: RootState) => state.passwordForgot);

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(resetPasswordRequest(password, code));
    };
    const handlePointerEnter = () => {
        console.log('Pointer entered');
    };

    const handlePointerLeave = () => {
        console.log('Pointer left');
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
                        onPointerEnterCapture={handlePointerEnter}
                        onPointerLeaveCapture={handlePointerLeave}
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
