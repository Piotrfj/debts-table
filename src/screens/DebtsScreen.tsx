import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import DebtsTable from '../components/DebtsTable/DebtsTable';
import useDebts from '../hooks/useDebts';

const DebtsScreen = () => {
    const { debts, loading, error, loadTopDebts, searchDebts } = useDebts();

    useEffect(() => {
        loadTopDebts();
    }, [loadTopDebts]);

    return (
        <>
            <Header onSearch={searchDebts} />
            <DebtsTable debts={debts} loading={loading} error={error} />
        </>
    );
};

export default DebtsScreen;
