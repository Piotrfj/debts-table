import { useEffect, useState } from 'react';

const useDebouncedSearch = (
    onSearch: (query: string) => void,
    delay = 400
) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, delay);

        return () => clearTimeout(timeout);
    }, [query, delay]);

    useEffect(() => {
        const trimmed = debouncedQuery.trim();
        if (trimmed.length === 0 || trimmed.length >= 3) {
            onSearch(trimmed);
        }
    }, [debouncedQuery, onSearch]);

    return {query, setQuery};
};

export default useDebouncedSearch;