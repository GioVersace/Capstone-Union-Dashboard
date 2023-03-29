import React from "react";
import { useTable, usePagination, useFilters, useGlobalFilter } from "react-table";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";

export default function PaginationTable({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
          //  set up our default Filter UI
          Filter: ColumnFilter
        }),
        []
      );


      

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page, // fetch the current page
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state, //table state
    setGlobalFilter //applies global filtering to the table.
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },// sets the number of entries to a page...maybe change to a var that can be set?
      defaultColumn
    },
    
    useFilters,// used for column sorting
    useGlobalFilter,// used for global sorting
    usePagination// used to the pagnation of the table
  );
  const { globalFilter } = state;

  return (
    <div className="justify-center">
        <div className="gap-x-2 relative inline-flex items-center px-2 py-2 border border-gray-500 bg-gray-200 text-sm font-medium text-gray-500 ">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>


        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-sm font-bold text-gray-700 uppercase tracking-wider" {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                </th>
                                
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                            {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td className="px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className="inline-flex">
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Prev
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Next
            </button>
            
            
        </div>

    </div>
  );
}