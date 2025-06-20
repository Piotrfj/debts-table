import React from 'react';
import styles from './Header.module.scss';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const {query, setQuery} = useDebouncedSearch(onSearch);

    const handleClick = () => {
        onSearch(query.trim());
    };

    return (
        <div className={styles.header}>
            <label htmlFor='searchInput' className={styles.header__label}>PODAJ NIP LUB NAZWĘ DŁUŻNIKA</label>
            <input
                className={styles.header__input}
                type="text"
                id='searchInput'
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
