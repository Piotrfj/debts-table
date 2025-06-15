import React, { useState } from 'react';
import styles from './DebtsTable.module.scss';
import { Debt } from '../../types/Debt';
import { Loader } from '../Loader/Loader';
import { formatDate } from '../../utils/formatDate';
import { SortConfig } from '../../types/Sorting';
import { sortDebts } from '../../utils/sortDebts';

interface DebtsTableProps {
    debts: Debt[];
    loading: boolean;
    error: string | null;
}

export const DebtsTable: React.FC<DebtsTableProps> = ({ debts, loading, error }) => {
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
    if (error) return <div>{error}</div>;

    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles.table__row}>
                <th className={styles.table__header} onClick={() => handleSort('Name')}>
                    DŁUŻNIK {sortConfig.key === 'Name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className={styles.table__header} onClick={() => handleSort('NIP')}>
                    NIP {sortConfig.key === 'NIP' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className={styles.table__header} onClick={() => handleSort('Value')}>
                    KWOTA ZADŁUŻENIA {sortConfig.key === 'Value' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className={styles.table__header} onClick={() => handleSort('Date')}>
                    DATA POWSTANIA ZOBOWIĄZANIA {sortConfig.key === 'Date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
            </tr>
            </thead>
            <tbody>
            {sortedDebts.map((debt) => (
                <tr key={debt.Id} className={styles.table__row}>
                    <td className={styles.table__cell}>{debt.Name}</td>
                    <td className={styles.table__cell}>{debt.NIP}</td>
                    <td className={styles.table__cell}>
                        {debt.Value.toLocaleString('pl-PL', {
                            style: 'currency',
                            currency: 'PLN',
                            minimumFractionDigits: 2,
                        })}
                    </td>
                    <td className={styles.table__cell}>{formatDate(debt.Date)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
