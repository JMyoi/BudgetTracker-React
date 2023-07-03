import './App.css'
import {useState} from 'react'
import HeaderToolbar from './HeaderToolbar'

function TotalInfo(){
  let totalBalance = 1000000;
  let totalSpent = 234039;
  return(
  <div className = "TotalInfo">
    <div id = "balance">
      <p>Total Balance:</p>
      ${totalBalance}
    </div>
    <div id = 'spending'>
      <p>Total Spending:</p>
      -${totalSpent}
    </div>
  </div>);
}


function BudgetTracker(){
   //this state holds an array of objects with transaction, data, and amount keys.
  const[transactions, setTransactions] = useState([]); 
  return (
    <>
    <TotalInfo />
    <HeaderToolbar />
    <Form transactions = {transactions} setTransactions = {setTransactions}/>
    <TableContent transactions = {transactions} setTransactions = {setTransactions}/>
    </>
  )
}
 

function Form({transactions, setTransactions }){

const[Open, setOpen] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    setTransactions(
        [{
          date: e.target.dateInput.value,
          description: e.target.descriptionInput.value,
          category: e.target.categoryInput.value,
          amount: e.target.amountInput.value,
          note:""
        }, ...transactions]
        //form.reset(); if you want the form to reset.
      );

    } 

    if(Open){
      return(
        <>
        <form onSubmit = {handleSubmit} className = "AddTransactionForm" >
        <label htmlFor ="dateInput" >Date: </label>
          <input id = "dateInput" type="date" required/>
        <label htmlFor = "descriptionInput"> Description: </label>
          <input id = "descriptionInput" type="text" required placeholder='Description of Transaction'/>
        <label htmlFor="categoryInput">Category: </label>
          <input id = 'categoryInput' type='text' required placeholder = 'ex.rent'/>
        <label htmlFor = "amountInput">Amount: </label>
          <input id ="amountInput" type="number" required placeholder = '- for spendings and + for earnings'/>
          <div className = "TransactionBtn">
          <button type = "button" onClick = {()=>setOpen(false)}>Cancel</button>
          <input type="submit" value = "Save"/>
          </div>
        </form>
        </>
      );
    }else{
      return(
        <>
          <button type = "button" onClick = {()=>setOpen(true)} className = 'AddTransactionBtn'>Add Transaction</button>
        </>
      );
    }
}


//this removes transactions that are the exact same.
function RemoveButton({Inputs, transactions, setTransactions}){
  return(
   <td className = "editBtns">
    <button type = "button" onClick = {()=>(setTransactions(transactions.filter(
      transaction=>{
          return(
            transaction.date!==Inputs.date ||
            transaction.description!== Inputs.description ||
            transaction.category!==Inputs.category ||
            transaction.amount!==Inputs.amount 
          )
    } )))}>Remove This and all duplicates</button>
      <button type = "button" >Edit</button>
      </td>
  );
} 

function Note({transactions, setTransactions}){
  const[show, setShow] = useState(false);
  const[note, setNote] = useState('');

  function addNote(){
    setNote()
  }

  return (
    <>
    <button onClick = {()=>setShow(true)} ><img className = "NoteButton" src="src/images/speechbubble.png" alt="speech bubble" /></button>
    {show?  <textarea value = {transactions.note} onChange={addNote}/>: <></>}
    </>
  );
}


function TableContent({transactions, setTransactions }){

  return (
    <>
    <div>
      <table id = "TableContent">
        <thead>
          <tr id = "headerRow">
            <th className = "tableHeader">Edit</th>
            <th className = "tableHeader">Date</th>
            <th className = "tableHeader">Description</th>
            <th className = "tableHeader">Category</th>
            <th className = "tableHeader">Amount</th>
          </tr>
        </thead>

        <tbody id = "dataBody">
          {transactions.map(
            (Inputs, i)=>{
              return(
                <>
                <tr className = "inputRow" key = {i}>
                  
                  {/*this button removes only that transaction by comparing index*/}
                  <td className = "editBtns">
                      <button type = "button" onClick = {()=>(
                        setTransactions(transactions.filter((transaction, index) => index !== i)))} >Remove
                     </button>
                  </td> 
                  <RemoveButton Inputs = {Inputs} transactions = {transactions} setTransactions = {setTransactions}/>

                  <td className = "tableData">{Inputs.date} </td>
                  <td className = "tableData">{Inputs.description} </td>
                  <td className = "tableData">{Inputs.category}</td>
                  <td className = "tableData">{Inputs.amount}</td>
                  <td className="tableData">Key:{i}</td> {/* Display the key */}
                  <Note transactions={transactions} setTransactions = {setTransactions} />
                </tr>
                </>
                )
              }
            )
          }

        </tbody>
      </table>  
    </div>
    </>
  )
}





export default function App() {
  return (
    <div id='Page'>
    <BudgetTracker/>
    </div>
  );
}


