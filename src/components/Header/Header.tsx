import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
    onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.trim().length < 3) return;
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    const handleClick = () => {
        onSearch(query);
    };

    return (
        <div className={styles.header}>
            <span className={styles.header__label}>PODAJ NIP LUB NAZWĘ DŁUŻNIKA</span>
            <input
                className={styles.header__input}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className={styles['header__button']} onClick={handleClick}>
                SZUKAJ
            </button>
        </div>
    );
};
