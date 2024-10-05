import React from "react";
import { registerUser, setEmailRegister, setPasswordRegister, setNameRegister } from '../../../services/actions/auth-actions';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import styles from './registration.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Registration = () => {
    const dispatch = useDispatch();
    const {emailRegister, passwordRegister, nameRegister, successRegister, error} = useSelector(state => state.authUser);

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(emailRegister, passwordRegister, nameRegister));
    };
    return (
        <div className={styles.container}>
            <div className={styles.noRegister}>
                <span className={styles.header}>
                    <p className="text text_type_main-medium">Регистрация</p>
                </span>
                <form onSubmit={handleRegister}>
                    <div className={styles.inputs}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            value={nameRegister}
                            onChange={(e) => dispatch(setNameRegister(e.target.value))}
                        />
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            value={emailRegister}
                            onChange={(e) => dispatch(setEmailRegister(e.target.value))}
                        />
                        <PasswordInput
                            value={passwordRegister}
                            onChange={(e) => dispatch(setPasswordRegister(e.target.value))}
                        />
                    </div>
                    <p className="text text_type_main-medium m-3">{(!successRegister) ? error : ""}</p>

                    <div className={styles.buttonRegister}>
                        <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
            <div className={styles.ifRegister}>
                <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
            </div>
        </div>
    );
}

export default Registration;
