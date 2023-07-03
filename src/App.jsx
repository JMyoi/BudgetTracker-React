import './App.css'
import {useState} from 'react'
import{v4 as uuidv4} from 'uuid'
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
          id: uuidv4()
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
function RemoveButton({transactionData, transactions, setTransactions}){
  return(
   <div className = "editBtns">
    <button type = "button" onClick = {()=>(setTransactions(transactions.filter(
      transaction=>{
          return(transaction.id!==transactionData.id)
      })))}>Remove</button>
   </div>
  );
} 

function Note(){
  const[show, setShow] = useState(false);
  const[note, setNote] = useState('');

  function addNote(event){
    setNote(event.target.value);
  }

  return (
    <td>
    <button onClick = {()=>setShow(true)} ><img className = "NoteButton" src="src/images/speechbubble.png" alt="speech bubble" /></button>
    {show?  <><textarea value = {note} onChange={addNote} onBlur={()=>setShow(false)}/> <button onClick={()=>setShow(false)}>X</button> </> : <></>}
    </td>
  );
}

function EditButton({transactionData, transactions, setTransactions}){
  const[showForm, setShowForm]= useState(false);

  function handleEditSubmit(event){
    setTransactions(transactions.map(
      transaction=>{
        if(transaction.id===transactionData.id){
          const NewTransaction = {
            date: event.target.dateinput.value,
            description: event.target.descriptioninput.value,
            category: event.target.categoryinput.value,
            amount: event.target.amountinput.value,
            id: transaction.id
          }
          return NewTransaction;
        }
        else{
          return transaction;
        }
      }
    ));
    setShowForm(false);
  }


  function FormCondition(){
    return(
      <form className = "AddTransactionForm" onSubmit = {handleEditSubmit} >
      <label htmlFor ="dateinput" >Date: </label>
        <input id = "dateinput" type="date" required />
      <label htmlFor = "descriptioninput"> Description: </label>
        <input id = "descriptioninput" type="text" required />
      <label htmlFor="categoryinput">Category: </label>
        <input id = 'categoryinput' type='text' required />
      <label htmlFor = "amountinput">Amount: </label>
        <input id ="amountinput" type="number" required />
        <div className = "TransactionBtn">
        <button type = "button" onClick = {()=>setShowForm(false)}>Cancel</button>
        <input type="submit" value = "Save" />
        </div>
      </form>
      );
  }

  return(
    <>
    <button onClick = {()=>setShowForm(true)}>Edit</button>
    {showForm && <FormCondition/>}
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
            (transactionData)=>{
              return(
                <>
                <tr className = "inputRow" key = {transactionData.id}>
                  <td>
                  <RemoveButton transactionData = {transactionData} transactions = {transactions} setTransactions = {setTransactions}/>
                  <EditButton transactionData = {transactionData} transactions = {transactions} setTransactions = {setTransactions}/>
                  </td>
                  <td className = "tableData">{transactionData.date} </td>
                  <td className = "tableData">{transactionData.description} </td>
                  <td className = "tableData">{transactionData.category}</td>
                  <td className = "tableData">{transactionData.amount}</td>
                  <Note/>
                  <td className="tableData">Key:{transactionData.id}</td> {/* Display the key for debugging purorses*/}
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

/*
now that we use uuid for unique id and keys we can add a note value to the transacitons objects
we can add note by using hte unique id and changing the array
we remove unique array elements by filtering out the id that should be removed.
we can edit my using the unique id

*/
