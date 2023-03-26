import React from "react";
import { useTable, usePagination, useFilters, useGlobalFilter } from "react-table";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";

export default function PaginationTable({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
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
      initialState: { pageSize: 2 },
      defaultColumn
    },
    
    useFilters,
    useGlobalFilter,
    usePagination
  );
  const { globalFilter } = state;

  return (
    <div className="items-center">
        <div className="gap-x-2 relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>


        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                <th scope="col" className="px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" {...column.getHeaderProps()}>
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


        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous page{" "}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next page{" "}
        </button>



    </div>
  );
}