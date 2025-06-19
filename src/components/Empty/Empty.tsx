import React from 'react';
import styles from './Empty.module.scss';


const Empty: React.FC = () => {
    return (
        <div className={styles.empty}>
            <span className={styles.empty__icon}>⚠️</span>
            <span>Brak danych</span>
        </div>
    );
};

export default Empty;