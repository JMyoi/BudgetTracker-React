import {useState} from 'react'
import {Link} from 'react-router-dom'

function FilterBy({transactions, setTransactions }){
    const[FilterType, setFilterType] = useState('');
    
    function handleFilter(event){
      setFilterType(event.target.value);
    }
  
    return(
      <div id = "Filter">
        <form>
          <label htmlFor="Filterby">Filter by: </label>
          <select  id="Filterby" defaultValue = "Both" onChange={handleFilter}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value = "Category">Category</option>
            <option value="Both">Both</option>
          </select>
        </form>
        <p>Selected: {FilterType===''? 'Nothing' : FilterType }</p>
      </div>
    )
}

  function SortBy({transactions, setTransactions }){
    const[SortType, setSortType] = useState('');

    function handleSort(event){
        setSortType(event.target.value);
    }
    //sort by date in descending order

    return(
        <div id = "Sort" >
            <form >
                <label htmlFor="SortBy">Sort by:</label>
                    <select  id="SortBy" defaultValue = "None" onChange = {handleSort}>
                        <option value="Date">Date</option>
                        <option value="Amount" >Amount</option>
                        <option value="None" >None</option>
                    </select>
            </form>
            <p>Selected: {SortType===''?'Nothing':SortType} </p>
            {transactions.map(
            (transactionData)=>{
              return(
                <>
                <tr className = "inputRow" key = {transactionData.id}>
                  <td className = "tableData">{transactionData.date} </td>
                  <td className = "tableData">{transactionData.type} </td>
                  <td className = "tableData">{transactionData.description} </td>
                  <td className = "tableData">{transactionData.category}</td>
                  <td className = "tableData">{(transactionData.amount>0)?('+'+transactionData.amount):(transactionData.amount)}</td>
                   {/* <td className="tableData">Key:{transactionData.id}</td> {//Display the key for debugging purorses}  */}
                </tr>
                </>
                )
              }
            )
          }
        </div>
    );
  }

  function DisplayMode({transactions, setTransactions }){
    const[DisplayType, setDisplayType] = useState('');

    function handleDisplay(event){
        setDisplayType(event.target.value);
    }

    return (
        <div id = 'Display'>
            <form>
                <label htmlFor="DisplayMode">Display mode:</label>
                <select id = 'DisplayMode' defaultValue = "Table" onChange = {handleDisplay}>
                    <option value="Table">Table</option>
                    <option value="Graph">Graph</option>
                    <option value="Both">Both</option>
                </select>
           </form>
           <Link to = {`/Graph`}>Graph & Table</Link>
        <p>Selected: {DisplayType}</p>

        </div>
    );
  }
  

  export default function HeaderToolbar({transactions, setTransactions }){
    
    return(
      <div id = "HeaderToolbar">
        <FilterBy transactions = {transactions} setTransactions = {setTransactions} />
        <SortBy transactions = {transactions} setTransactions = {setTransactions} />
        <DisplayMode transactions = {transactions} setTransactions = {setTransactions} />
      </div>
    )
  }
  