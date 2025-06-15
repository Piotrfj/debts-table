import { useCallback, useState } from 'react';
import { getTopDebts, getFilteredDebts } from '../api/debts';
import { Debt } from '../types/Debt';

export const useDebts = () => {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadTopDebts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTopDebts();
            setDebts(data);
        } catch (err) {
            setError('An error occurred while loading debts.');
        } finally {
            setLoading(false);
        }
    }, []);

    const searchDebts = useCallback(async (phrase: string) => {
        if (!phrase.trim()) {
            return loadTopDebts();
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getFilteredDebts(phrase);
            setDebts(data);
        } catch (err) {
            setError('An error occurred while filtering debts.');
        } finally {
            setLoading(false);
        }
    }, [loadTopDebts]);

    return { debts, loading, error, loadTopDebts, searchDebts };
};
