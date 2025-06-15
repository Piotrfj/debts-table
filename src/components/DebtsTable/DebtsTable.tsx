import React from 'react';
import styles from './DebtsTable.module.scss';
import { useDebts } from '../../hooks/useDebts';
import { Loader } from '../Loader/Loader';
import { formatDate } from '../../utils/formatDate';

export const DebtsTable = () => {
    const {debts, loading, error} = useDebts();

    if (loading) return <Loader/>;
    if (error) return <div>{error}</div>;

    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles.table__row}>
                <th className={styles.table__cell}>Nazwa dłużnika</th>
                <th className={styles.table__cell}>NIP</th>
                <th className={styles.table__cell}>Kwota zadłużenia</th>
                <th className={styles.table__cell}>Data publikacji</th>
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
    );
};
