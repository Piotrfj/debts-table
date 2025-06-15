import { Debt } from '../types/Debt';
import { SortConfig } from '../types/Sorting';

export const sortDebts = (debts: Debt[], config: SortConfig): Debt[] => {
    const sorted = [...debts];

    sorted.sort((a, b) => {
        const aVal = a[config.key];
        const bVal = b[config.key];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return config.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return config.direction === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        return 0;
    });

    return sorted;
};
