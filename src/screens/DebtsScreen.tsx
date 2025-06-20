import React from 'react';
import Header from '../components/Header/Header';
import DebtsTable from '../components/DebtsTable/DebtsTable';
import useDebts from '../hooks/useDebts';

export const DebtsScreen = () => {
    const { debts, loading, error, searchDebts } = useDebts();

    return (
        <>
            <Header onSearch={searchDebts} />
            <DebtsTable debts={debts} loading={loading} error={error} />
        </>
    );
};
