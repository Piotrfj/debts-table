import React from 'react';
import styles from './Header.module.scss';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const {query, setQuery} = useDebouncedSearch(onSearch);

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
            <button className={styles.header__button} onClick={handleClick}>
                SZUKAJ
            </button>
        </div>
    );
};

export default Header;
