import React from 'react';
import styles from './DebtsTable.module.scss';

export const DebtsTable = () => {
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
            <tr className={styles.table__row}>
                <td className={styles.table__cell}>–</td>
                <td className={styles.table__cell}>–</td>
                <td className={styles.table__cell}>–</td>
                <td className={styles.table__cell}>–</td>
            </tr>
            </tbody>
        </table>
    );
};
