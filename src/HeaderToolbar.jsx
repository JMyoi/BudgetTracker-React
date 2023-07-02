import {useState} from 'react'

function FilterBy(){
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

  function SortBy(){
    const[SortType, setSortType] = useState('');

    function handleSort(event){
        setSortType(event.target.value);
    }

    return(
        <div id = "Sort" >
            <form >
                <label htmlFor="SortBy">Sort by:</label>
                    <select  id="SortBy" defaultValue = "None" onChange = {handleSort}>
                        <option value="Date">Date</option>
                        <option value="Price" >Price</option>
                        <option value="None" >None</option>
                    </select>
            </form>
            <p>Selected: {SortType===''?'Nothing':SortType}</p>
        </div>
    );
  }

  function DisplayMode(){
    const[DisplayType, setDisplayType] = useState('');

    function handleDisplay(event){
        setDisplayType(event.target.value);
    }

    return (
        <div id = 'Display'>
            <form>
                <label htmlFor="DisplayMode">Display mode:</label>
                <select id = 'DisplayMode' defaultvalue = "Table" onChange = {handleDisplay}>
                    <option value="Table">Table</option>
                    <option value="Graph">Graph</option>
                    <option value="Both">Both</option>
                </select>
           </form>
        <p>Selected: {DisplayType}</p>

        </div>
    );
  }
  
  export default function HeaderToolbar(){
  
    return(
      <div id = "HeaderToolbar">
        <FilterBy/>
        <SortBy/>
        <DisplayMode/>
      </div>
    )
  }
  