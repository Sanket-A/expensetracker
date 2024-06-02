import React, { useState } from 'react';
import './summary.css';

const Summary = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const calculateSummary = () => {
    return transactions.reduce((summary, transaction) => {
      const { category, amount, type, tax } = transaction;
      const amountValue = parseFloat(amount);
      const taxValue = parseFloat(tax);

      if (!summary[category]) {
      summary[category] = { income: 0, expenses: 0, tax: 0 };
      }

      if (type === 'income') {
      summary[category].income += amountValue;
      } else if (type === 'expenses') {
      summary[category].expenses += amountValue;
      }

      summary[category].tax += taxValue;

      return summary;
    }, {});
  };

  const summaryData = calculateSummary();

  const filteredSummaryData = Object.fromEntries(
  Object.entries(summaryData).filter(([category]) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="summary">
      <div className="top">
      <h2>Summary</h2>
      <div className="search-bar">
      <input   type="text" placeholder="Search by category..."  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
      </div>
      </div>
      <div className="center">
        <div className="summary-list">
          {Object.entries(filteredSummaryData).map(([category, data]) => (
         <div key={category} className="summary-item">
          <div className="category">{category}</div>
          <div className="income">Total Income: ${data.income.toFixed(2)}</div>
          <div className="expenses">Total Expenses: ${data.expenses.toFixed(2)}</div>
          <div className="tax">Total Tax: ${data.tax.toFixed(2)}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
