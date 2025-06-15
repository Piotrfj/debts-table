import { useEffect, useState } from 'react';
import { getTopDebts } from '../api/debts';
import { Debt } from '../types/Debt';

export const useDebts = () => {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDebts = async () => {
            try {
                setLoading(true);
                const data = await getTopDebts();
                setDebts(data);
            } catch (err) {
                setError('An error occurred while fetching the data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDebts();
    }, []);

    return { debts, loading, error };
};
