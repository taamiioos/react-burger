import styles from './app-header.module.css';
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useLocation} from 'react-router-dom';
import React, {useEffect} from "react";

const AppHeader = () => {
    const [color, setColor] = React.useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/profile') {
            setColor(true);
        } else {
            setColor(false);
        }
    }, [location]);

    return (
        <div className={styles.container}>
            <header className={styles.headerContainer}>
                <nav>
                    <ul className={styles.ul1}>
                        <li>
                            <BurgerIcon type={color ? "primary" : "secondary"}/>
                            <NavLink
                                to={'/'}
                                className={({isActive}) =>
                                    isActive ? `${styles.link} text text_type_main-default text_color_inactive pl-2` : `${styles.link} text text_type_main-default pl-1`
                                }
                            >
                                Конструктор
                            </NavLink>
                        </li>
                        <li>
                            <ListIcon type="primary"/>
                            <span className='text text_type_main-default pl-1'>Лента заказов</span>
                        </li>
                    </ul>
                    <NavLink to={'/'}
                             className={styles.logo}>
                        <Logo/>
                    </NavLink>
                    <ul className={styles.ul2}>
                        <li className={styles.profile}>
                            <ProfileIcon type={color ? "secondary" : "primary"}/>
                            <NavLink
                                to={'/profile'}
                                className={({isActive}) =>
                                    isActive ? `${styles.link} text text_type_main-default text_color_inactive pl-2` : `${styles.link} text text_type_main-default pl-1`
                                }
                            >
                                Личный кабинет
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default AppHeader;
