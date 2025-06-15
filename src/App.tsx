import React from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header/Header';
import { DebtsTable } from './components/DebtsTable/DebtsTable';

function App() {
  return (
      <div className={styles.app}>
        <Header />
        <DebtsTable />
      </div>
  );
}

export default App;
