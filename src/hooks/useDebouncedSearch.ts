import { useEffect, useState } from 'react';

const useDebouncedSearch = (
    query: string,
    onSearch: (query: string) => void,
    delay = 400
) => {
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
};

export default useDebouncedSearch;