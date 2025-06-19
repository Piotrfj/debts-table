import React from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
    return <div className={styles.loader}><span>Loading</span><span className={styles.loader__spinner}></span></div>;
};
