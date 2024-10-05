import React from 'react';
import { Link } from 'react-router-dom';
import styles from './404page.module.css';

const Page404 = () => {
    return (
        <div className={styles.page404}>
            <h1 className="text text_type_main-large m-5">404 - Page Not Found</h1>
            <p className="text text_type_main-default m-5">Тут вы бургер не сможете собрать(</p>
            <Link to="/" className="text text_type_main-medium">А тут сможете</Link>
        </div>
    );
};

export default Page404;
