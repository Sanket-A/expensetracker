import React, { useState } from 'react';
import './inputform.css';

const InputForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !type) {
    alert("Please fill in all required fields."); 
    return;
    }

    const incomeTaxRate = 0.10;
    const expensesTaxRate = 0.05;

    let tax = 0;
    if (type === "income") {
      tax = parseFloat(amount) * incomeTaxRate;
    } else if (type === "expenses") {
      tax = parseFloat(amount) * expensesTaxRate;
    }
    onSubmit({ amount, category, type, note, tax });
  };

  return (
    <form className='inputform' onSubmit={handleSubmit}>
    <div className="input">
     <label>Amount</label>
     <input 
      type='number' id='amount'value={amount} onChange={(e) => setAmount(e.target.value)}/>
      </div>

      <div className="input">
        <label htmlFor='category'>Category:</label>
        <select id='category' value={category} onChange={(e) => setCategory(e.target.value)} >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Rent">Rent</option>
          <option value="Fashion">Fashion</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Beauty">Beauty</option>
        </select>
      </div>

      <div className="input">
        <label>Note</label>
        <input type='text' id='note'value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="inputradio">
        <label> 
          <input type="radio" name='type' value="income" checked={type === "income"} onChange={(e) => setType(e.target.value)}  />    
          Income
    </label>
    <label>
      <input type="radio" name='type' value="expenses" checked={type === "expenses"} onChange={(e) => setType(e.target.value)} />
          Expenses
      </label>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default InputForm;
