import { useState, useMemo } from 'react';
import { Debt } from '../types/Debt';
import { SortConfig } from '../types/Sorting';
import { sortDebts } from '../utils/sortDebts';

const useSortedDebts = (debts: Debt[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'Name',
        direction: 'asc',
    });

    const handleSort = (key: SortConfig['key']) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedDebts = useMemo(() => sortDebts(debts, sortConfig), [debts, sortConfig]);

    return {
        sortedDebts,
        sortConfig,
        handleSort,
    };
};

export default useSortedDebts;