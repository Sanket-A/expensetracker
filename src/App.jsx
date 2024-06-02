import React, { useState, useEffect, useCallback } from 'react';
import History from './components/history/History';
import Summary from './components/summary/Summary';

function App() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleTransactionsUpdate = useCallback((updatedTransactions) => {
    setTransactions(updatedTransactions);
  }, []);

  return (
    <>
      <History onTransactionsUpdate={handleTransactionsUpdate} initialTransactions={transactions} />
      <Summary transactions={transactions} />
    </>
  );
}

export default App;
