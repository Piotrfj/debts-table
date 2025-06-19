import React from 'react';
import { Debt } from '../../types/Debt';
import { SortConfig } from '../../types/Sorting';
import { formatDate } from "../../utils/formatDate";
import styles from './DebtsTable.module.scss';

interface DebtsTableDesktopProps {
    debts: Debt[];
    sortConfig: SortConfig;
    handleSort: (key: SortConfig['key']) => void;
}

const DebtsTableDesktop: React.FC<DebtsTableDesktopProps> = ({debts, sortConfig, handleSort}) => (
    <div className={styles.desktopTable}>
        <table className={styles.table}>
            <thead>
            <tr className={styles.table__row}>
                <th className={`${styles.table__header} ${sortConfig.key === 'Name' && styles['table__header--sortedBy']}`}
                    onClick={() => handleSort('Name')}
                >
                    DŁUŻNIK {sortConfig.key === 'Name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className={`${styles.table__header} ${sortConfig.key === 'NIP' && styles['table__header--sortedBy']}`}
                    onClick={() => handleSort('NIP')}
                >
                    NIP {sortConfig.key === 'NIP' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className={`${styles.table__header} ${sortConfig.key === 'Value' && styles['table__header--sortedBy']}`}
                    onClick={() => handleSort('Value')}
                >
                    KWOTA ZADŁUŻENIA {sortConfig.key === 'Value' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className={`${styles.table__header} ${sortConfig.key === 'Date' && styles['table__header--sortedBy']}`}
                    onClick={() => handleSort('Date')}
                >
                    DATA POWSTANIA
                    ZOBOWIĄZANIA {sortConfig.key === 'Date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
            </tr>
            </thead>
            <tbody>
            {debts.map((debt) => (
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
    </div>
);

export default DebtsTableDesktop;
