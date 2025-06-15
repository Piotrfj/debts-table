import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <div className={styles.header}>
            <input
                className={styles['header__input']}
                type="text"
                placeholder="Wpisz nazwę dłużnika lub NIP"
            />
            <button className={styles['header__button']}>Szukaj</button>
        </div>
    );
};
