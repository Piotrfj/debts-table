import React, { useState } from 'react';
import { Debt } from '../../types/Debt';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { SortConfig } from '../../types/Sorting';
import { sortDebts } from '../../utils/sortDebts';
import { useMediaQuery } from 'react-responsive';
import DebtsTableDesktop from './DebtsTableDesktop';
import DebtsTableMobile from './DebtsTableMobile';
import Empty from "../Empty/Empty";

interface DebtsTableProps {
    debts: Debt[];
    loading: boolean;
    error: string | null;
}

const DebtsTable: React.FC<DebtsTableProps> = ({ debts, loading, error }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

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

    const sortedDebts = sortDebts(debts, sortConfig);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;
    if (sortedDebts.length === 0) return <Empty />;

    const commonProps = { debts: sortedDebts, sortConfig, handleSort };

    return isMobile ? (
        <DebtsTableMobile {...commonProps} />
    ) : (
        <DebtsTableDesktop {...commonProps} />
    );
};

export default DebtsTable;