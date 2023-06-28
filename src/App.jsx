import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function BudgetTracker() {
  const [transactions, setTransactions] = useState([]);//set to empty aray

  const handleAddTransaction = (event) => {
    event.preventDefault();
    const form = event.target;
    const transaction = {
      name: form.name.value,
      date: form.date.value,
      //turn the string into floating point number
      amount: parseFloat(form.amount.value),
    };
    setTransactions([...transactions, transaction]);
    form.reset();
  };

  const handleRemoveTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  return (
    <div className="budget-tracker">
      <form onSubmit={handleAddTransaction}>
        <label>
          Transaction:
          <input type="text" name="name" required />
        </label>
        <label>
          Date:
          <input type="date" name="date" required />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" step="0.01" required />
        </label>
        <button type="submit">Add Transaction</button>
      </form>

      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.name}</td>
                <td>{transaction.date}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveTransaction(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        //if no transactions.
        <p>No transactions available.</p>
      )}
    </div>
  );
}

function App() {
  return <BudgetTracker/>;
}

export default App;
