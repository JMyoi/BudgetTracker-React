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
          amount: e.target.amountInput.value

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
        {/* TableContent transactionInputs = {transactionInputs} setTransactionInputs={setTransactionInputs}/> */}
        </>
      );
    }else{
      return(
        <>
          <button type = "button" onClick = {()=>setOpen(true)} className = 'AddTransactionBtn'>Add Transaction</button>
          {/* <TableContent transactionInputs = {transactionInputs} setTransactionInputs={setTransactionInputs}/> */}
        </>
      );
    }
}




function TableContent({transactions, setTransactions }){

// function handleRemove({inputs}){
//   setTransactions(
//     transactions.filter(
//         transaction=>{
//          return(transaction.date!==inputs.date &&
//           transaction.description!== inputs.description &&
//           transaction.category!==inputs.category &&
//           transaction.amount!==inputs.amount)
//         })
//   );
// }


//this removes transactions that are the exact same.
//try transaction!==Inputs
function RemoveButton({Inputs}){
  
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
    } )))}>Remove</button>
      <button type = "button" >Edit</button>
      </td>
  );
} 


// function RemoveByKeyButton({key}){
//   return(
//     <td className = "editBtns">
//       <button type = "button" onClick = {()=>(
//          setTransactions(transactions.filter((index) => index !== key)))} >Remove This</button>
//     </td> 
//   );
// }


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
                  <RemoveButton Inputs = {Inputs}/>
                  <td className = "editBtns">
                      <button type = "button" onClick = {()=>(
                        setTransactions(transactions.filter((transaction, index) => index !== i)))} >Remove
                     </button>
                  </td> 

                  <td className = "tableData">{Inputs.date} </td>
                  <td className = "tableData">{Inputs.description} </td>
                  <td className = "tableData">{Inputs.category}</td>
                  <td className = "tableData">{Inputs.amount}</td>
                  <td className="tableData">Key:{i}</td> {/* Display the key */}
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
/*          
      <td className = "editBtns">
                  <button type = "button" onClick = {()=>(
                     setTransactions(
                      transactions.filter((transaction, index) => index !== i)))} >Remove</button>
                  <button type = "button" >Edit</button>
                  </td> 
                  
*/




export default function App() {
  return (
    <div id='Page'>
    <BudgetTracker/>
    </div>
  );
}



// function BudgetTracker(){
//   //this state holds an array of objects with transaction, data, and amount keys.
//   const[transactionInputs, setTransactionInputs] = useState([]);  
  
//   function Form(){
//     function handleSubmit(e){
//       e.preventDefault();
//         setTransactionInputs(
//           [{
//             transaction: e.target.transactionInput.value,
//             date: e.target.dateInput.value,
//             amount: e.target.amountInput.value
//           },
//           ...transactionInputs]
//         );
  
//       } 
      
//     return(
//       <form onSubmit = {handleSubmit} class = "Form">
//       <label htmlFor = "transactionInput"> Transaction: </label>
//         <input id = "transactionInput" type="text" required placeholder='Name of Transaction'/>
//       <label htmlFor ="dateInput" >date: </label>
//         <input id = "dateInput" type="date" required/>
//       <label htmlFor = "amountInput">amount: </label>
//         <input id ="amountInput" type="number" required placeholder = '- for spendings and + for earnings'/>
//       <input type="submit" />
//     </form>
//     )
  
//   }
  
//     return (
//       <>
//       <Form/>
//       <div id = "ContentBody">
//         <table id = "TableContent">
//           <thead>
//             <tr id = "headerRow">
//               <th>Transaction</th>
//               <th>Date</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
  
//           <tbody id = "dataBody">
//             {transactionInputs.map(
//               (Inputs)=>{
//                 let transaction = Inputs.transaction;
//                 let date = Inputs.date;
//                 let amount = Inputs.amount;
//                 return(
//                   <tr className = "inputRow">
//                     <td className = "tableData">{transaction} </td>
//                     <td className = "tableData">{date} </td>
//                     <td className = "tableData">{amount}</td>
//                   </tr>
//                   )
//                 }
//               )
//             }
//           </tbody>
//         </table>
  
//       </div>
//       </>
//     )
  
  
//   }