import supabase from "../config/supabaseClient"
import { useEffect, useState, React, useMemo } from "react"
import PaginationTable from "../components/PaginationTable";
import { Link } from "react-router-dom"


const Home = () => {
  const [cells, setCells] = useState(null);// sued to store the pulled info from supabase
  const [updateID, setUpdateID] = useState('');

  const columns = useMemo(// colums for the table that we will use later
    () => [
      {
        Header: "ID",
        accessor: "id" // accessor is the "key" in the data
      },
      {
        Header: "Expenses",
        accessor: "expenses" // accessor is the "key" in the data
      },
      {
        Header: "Subexpense",
        accessor: "subExpense"
      },
      {
        Header: "Projected Amount",
        accessor: "projAmnt"
      },
      {
        Header: "Amount Spent",
        accessor: "amntSpent"
      },
      {
        Header: "Entry Date",
        accessor: "date"
      },
      {
        Header: "Transaction Date",
        accessor: "transDate"
      },
      {
        Header: "Account Number",
        accessor: "refCode"
      },
      {
        Header: "Payment Type",
        accessor: "cardUsed"
      }
    ],
    []
  );

  /*
    this method pulls the stuff from the database and updates cells where we will then send it into
    the paginationTable js
  */
  useEffect(() => {
    const fetchExamples = async () => {
      const { data,error } = await supabase// pulls from the database
      .from('example_data')
      .select()// have to use select because were in v2

      if (error){
        console.log(error)
      }

      if(data){
        setCells(data);// resets the error to null if db retrieval is successful
        console.log(cells)
      }
    }

    fetchExamples()

  }, [])

  // updates data only when things change
  const data = useMemo(() => cells,[cells]);
  
  return( 
  <div>
    {cells && <PaginationTable columns={columns} data={data} />}
    <div className="float-right">
      <input
    type="text"
    value={updateID}
    placeholder="Enter Entry ID Here..."
    onChange={(e) => setUpdateID(e.target.value)}
    >
    </input>
    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
      <Link to={'/' + updateID}>
            Update Entry           
      </Link>
      
    </button>
    </div>   
  </div> 
  
  );
}
  
  export default Home