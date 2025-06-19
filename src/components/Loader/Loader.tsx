import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
    return <div className={styles.loader}><span>Loading</span><span className={styles.loader__spinner}></span></div>;
};

export default Loader;
