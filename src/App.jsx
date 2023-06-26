import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function TransactionList() {
  const transactions = [
    { id: 1, description: 'Groceries', amount: -50 },
    { id: 2, description: 'Salary', amount: 1000 },
    { id: 3, description: 'Rent', amount: -800 },
    { id: 4, description: 'Dinner', amount: -30 },
  ];

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span className={transaction.amount < 0 ? 'expense' : 'income'}>
              {transaction.description}
            </span>
            <span>${transaction.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TransactionList />
    </div>
  );
}

export default App
