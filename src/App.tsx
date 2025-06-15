import React from 'react';
import styles from './App.module.scss';
import { DebtsScreen } from './features/debts/DebtsScreen';

function App() {
    return (
        <div className={styles.app}>
            <DebtsScreen />
        </div>
    );
}

export default App;
