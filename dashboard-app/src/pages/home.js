import supabase from "../config/supabaseClient"
import { useEffect, useState, React, useMemo } from "react"
import PaginationTable from "../components/PaginationTable";


const Home = () => {
  const [cells, setCells] = useState([]);

  const getData = async () => {
    const temp = await supabase
      .from("example_data")
      .select() //IMPORTANT NOTE: WE ARE USING SUPABASE V2 SO WE MUST USE SELECT TO ACTUALLY HAVE THINGS HAPPEN WHEN WE GET THE DATA

    setCells(temp);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Expenses",
        accessor: "expenses" // accessor is the "key" in the data
      },
      {
        Header: "Subexpense",
        accessor: "subExpense"
      },
      {
        Header: "Projeected Amount",
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

  useEffect(() => {
    getData();
  },[]);
  
  const data = useMemo(() => cells,[cells]);
  
  return <>{cells && <PaginationTable columns={columns} data={data} />}</>;
}
  
  export default Home