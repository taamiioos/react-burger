import React, { useEffect } from "react";
import { loginUser, setEmailLogin, setPasswordLogin } from '../../../services/actions/auth-actions';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/reducers/root-reducer';
import { AppDispatch } from '../../../services/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { emailLogin, passwordLogin, isAuth, error } = useSelector((state: RootState) => state.authUser);
    const navigate = useNavigate();
    const [errorP, setErrorP] = React.useState<string>("");
    useEffect(() => {
        if (error) {
            setErrorP(error);
            const timer = setTimeout(() => {
                setErrorP('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(emailLogin, passwordLogin));
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/login", { replace: true });
        }
    }, [isAuth, navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.noRegister}>
                <span className={styles.header}>
                    <p className="text text_type_main-medium">Вход</p>
                </span>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputs}>
                        <EmailInput
                            placeholder={'E-mail'}
                            value={emailLogin}
                            onChange={(e) => dispatch(setEmailLogin(e.target.value))}
                            name={'email'}
                        />
                        <PasswordInput
                            value={passwordLogin}
                            onChange={(e) => dispatch(setPasswordLogin(e.target.value))}
                        />
                    </div>
                    <p className="text text_type_main-medium m-3">{errorP}</p>
                    <div className={styles.buttonRegister}>
                        <Button htmlType="submit" type="primary" size="medium">Войти</Button>
                    </div>
                </form>
            </div>
            <div className={styles.ifRegister}>
                <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
            </div>
            <div className={styles.ifRegister}>
                <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
            </div>
        </div>
    );
}

export default Login;
