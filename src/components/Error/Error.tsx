import React from 'react';
import styles from './Error.module.scss';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className={styles.error}>
            <span className={styles.error__icon}>⚠️</span>
            <span>{message}</span>
        </div>
    );
};

export default Error;