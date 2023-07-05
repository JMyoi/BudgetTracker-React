import './App.css'
import {useState} from 'react'
import{v4 as uuidv4} from 'uuid'
import HeaderToolbar from './HeaderToolbar'

function TotalInfo({transactions}){
  //const [totals, setTotals] = useState({balance:0, expense:0});

  let size= transactions.length;

  let totalBalance = 0;
  for(let i = 0; i<size; i++){
    totalBalance+=transactions[i].amount;
  }
  //setTotals({balance:totalBalance, ...totals});
  
  let totalExpense = 0;
  for(let i =0; i<size; i++){
    if(transactions[i].amount<0){
      totalExpense+=transactions[i].amount;
    }
  }
 // setTotals({...totals, expense:totalExpense});

  return(
  <div className = "TotalInfo">
    <div id = "balance">
      <p>Total Balance:</p>
      ${totalBalance}
    </div>
    <div id = 'expense'>
      <p>Total Expense:</p>
      -${totalExpense}
    </div>
  </div>);
}


function BudgetTracker(){
   //this state holds an array of objects with transaction, data, and amount keys.
  const[transactions, setTransactions] = useState([]); 

  return (
    <>
    <TotalInfo transactions = {transactions}/>
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
    //determine if the amount should be negative(expense) or positive(income)
    let amt = (e.target.transactionType.value==="expense")? (-e.target.amountInput.value) : (+e.target.amountInput.value) ;
    setTransactions(
        [{
          date: e.target.dateInput.value,
          description: e.target.descriptionInput.value,
          category: e.target.categoryInput.value,
          amount: amt,
          type: e.target.transactionType.value,
          id: uuidv4()//gives a unique id for all transactions by using the uuid
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
          <input id = "descriptionInput" type="text" required placeholder='ex.water'/>
        <label htmlFor="categoryInput">Category: </label>
          <input id = 'categoryInput' type='text' required placeholder = 'ex.groceries'/>
        <label htmlFor = "amountInput">Amount: </label>
          <input id ="amountInput" type="number" required />
          <input type = 'radio' value = 'expense' name = 'transactionType'/>{/*radio group must share the same name attribute so that when one is selected the others are unselected. You also refer to the name to get the selected value*/}
        <label htmlFor="transactionType">expense </label>
        <input type = 'radio' value = 'income' name = 'transactionType'/>
        <label htmlFor="transactionType">income </label>
          <div className = "TransactionBtn">
          <button type = "button" onClick = {()=>setOpen(false)}>Cancel</button>
          <button type = "reset"> Reset</button>
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
  const[showPreview, setShowPreview] = useState(false);
  const[note, setNote] = useState('');

  function addNote(event){
    setNote(event.target.value);
  }

  return (
    <td>
      <button onClick = {()=>{show?setShow(false):setShow(true)}} onMouseEnter={()=>{setShowPreview(true)}} onMouseLeave={()=>{setShowPreview(false)}} >
        <img className = "NoteButton" src="src/images/speechbubble.png" alt="speech bubble" />
      </button>
      {showPreview? <p className= 'previewNote'>{note}</p>:<></> }
      {show?  <><textarea value = {note} onChange={addNote} />
            <button onClick={()=>setShow(false)}>X</button> </> 
        : <></>}
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
            type: event.target.transactionType.value,
            id: transaction.id//id should stay the same
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
        <input type = 'radio' value = 'expense' name = 'transactionType' require/>
        <label htmlFor="transactionType">expense </label>
        <input type = 'radio' value = 'income' name = 'transactionType' require/>
        <label htmlFor="transactionType">income </label>
        <div className = "TransactionBtn">
        <button type = "button" onClick = {()=>setShowForm(false)}>Cancel</button>
        <button type = "reset"> Reset</button>
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
            <th className = 'tableHeader'>Type</th>
            <th className = "tableHeader">Description</th>
            <th className = "tableHeader">Category</th>
            <th className = "tableHeader">Amount</th>
            <th className = "tableHeader">Notes</th>
          </tr>
        </thead>

        <tbody id = "dataBody">
          {transactions.map(
            (transactionData)=>{
              return(
                <>
                <tr className = "inputRow" key = {transactionData.id}>
                  <td className = "tableData">
                  <RemoveButton transactionData = {transactionData} transactions = {transactions} setTransactions = {setTransactions}/>
                  <EditButton transactionData = {transactionData} transactions = {transactions} setTransactions = {setTransactions}/>
                  </td>
                  <td className = "tableData">{transactionData.date} </td>
                  <td className = "tableData">{transactionData.type} </td>
                  <td className = "tableData">{transactionData.description} </td>
                  <td className = "tableData">{transactionData.category}</td>
                  <td className = "tableData">{(transactionData.amount>0)?('+'+transactionData.amount):(transactionData.amount)}</td>
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

