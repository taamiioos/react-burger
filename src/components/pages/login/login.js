import React, { useEffect } from "react";
import { loginUser, setEmailLogin, setPasswordLogin } from '../../../services/actions/auth-actions';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const { emailLogin = '', passwordLogin = '', isAuth, error} = useSelector(state => state.authUser);
    const navigate = useNavigate();
    const [errorP, setErrorP] = React.useState("");

    useEffect(() => {
        if (error) {
            setErrorP(error);
            const timer = setTimeout(() => {
                setErrorP('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(emailLogin, passwordLogin));
    };
    useEffect(() => {
        if (isAuth) {
            navigate("/", { replace: true });
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
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            value={emailLogin}
                            onChange={(e) => dispatch(setEmailLogin(e.target.value))}
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
