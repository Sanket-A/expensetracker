import React, { useState, useEffect } from 'react';
import './history.css';
import InputForm from './inputform/InputForm';

const History = ({ onTransactionsUpdate, initialTransactions }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [iconSrc, setIconSrc] = useState('../plus.png');

  useEffect(() => {
    onTransactionsUpdate(transactions);
  }, [transactions, onTransactionsUpdate]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIconSrc(isFormVisible ? '../plus.png' : '../minus.png');
  };

  const handleFormSubmit = (newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    setIsFormVisible(false);
    setIconSrc('../plus.png'); 
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotal = (type) => {
  return filteredTransactions.reduce((acc, transaction) => {
   return transaction.type === type ? acc + parseFloat(transaction.amount) : acc;
    }, 0).toFixed(2);
  };

  const calculateTotalTax = () => {
    return transactions.reduce((acc, transaction) => {
    return acc + parseFloat(transaction.tax || 0);
    }, 0).toFixed(2);
  };

  return (
    <div className="history">
    <div className="top">
    <div className="texts">
      <span>Transaction History</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search by category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>
      <div className="center">
       <table className="transaction-table">
       <thead>
       <tr>
          <th>S.N.</th>
          <th>Category</th>
          <th>Note</th>
          <th>I/E</th>
          <th>Amount($)</th>
          <th>Tax($)</th>
          <th>Actions</th>
      </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
          <tr key={index} className="transaction">
            <td>{index + 1}</td>
            <td>{transaction.category}</td>
            <td>{transaction.note}</td>
            <td>{transaction.type}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.tax.toFixed(2)}</td>
            <td>
              <button onClick={() => handleDeleteTransaction(index)}>Delete</button>
            </td>
          </tr>
        ))}
    </tbody>
      </table>
      </div>
      <div className="totals">
        <div className="total-income">
        <p>Total Income: ${calculateTotal('income')}</p>
       </div>
        <div className="total-expenses">
      <p>Total Expenses: ${calculateTotal('expenses')}</p>
      </div>
        <div className="total-tax">
       <p>Total Tax: ${calculateTotalTax()}</p>
      </div>
      <div className="remaining-balance">
      <p>Remaining Balance: ${(calculateTotal('income') - calculateTotal('expenses')).toFixed(2)}</p>
      </div>
      </div>
      <hr />
      <div className="bottom">
      <div className="addtransaction" onClick={toggleFormVisibility}>
       <img src={iconSrc} alt="Toggle Form" />
      </div>
      </div>
      {isFormVisible && <InputForm onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default History;
