import React from 'react';
import { Debt } from '../../types/Debt';
import { SortConfig } from '../../types/Sorting';
import { formatDate } from "../../utils/formatDate";
import styles from './DebtsTable.module.scss';

interface DebtsTableMobileProps {
    debts: Debt[];
    sortConfig: SortConfig;
    handleSort: (key: SortConfig['key']) => void;
}

const DebtsTableMobile: React.FC<DebtsTableMobileProps> = ({debts, sortConfig, handleSort}: DebtsTableMobileProps) => (
    <div className={styles.mobileTable}>
        <div className={styles.sortControls}>
            <label className={styles.sortControls__label} htmlFor="sortKey">Sortuj według:</label>
            <select
                className={styles.sortControls__select}
                id="sortKey"
                value={sortConfig.key}
                onChange={(e) => handleSort(e.target.value as SortConfig['key'])}
            >
                <option value="Name">Dłużnik</option>
                <option value="NIP">NIP</option>
                <option value="Value">Kwota</option>
                <option value="Date">Data</option>
            </select>
            <button className={styles.sortControls__directionButton} onClick={() => handleSort(sortConfig.key)}>
                {sortConfig.direction === 'asc' ? '▲' : '▼'}
            </button>
        </div>


        {debts.map((debt) => (
            <div key={debt.Id} className={styles.mobileTable__card}>
                <label>Dłużnik:</label>
                <span>{debt.Name}</span>
                <label>NIP:</label>
                <span>{debt.NIP}</span>
                <label>Kwota zadłużenia:</label>
                <span>{debt.Value.toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})}</span>
                <label>Data powstania zobowiązania:</label>
                <span>{formatDate(debt.Date)}</span>
            </div>
        ))}
    </div>
);

export default DebtsTableMobile;