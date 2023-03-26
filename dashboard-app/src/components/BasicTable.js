import React from "react";
import { useTable } from "react-table";

export default function BasicTable({ columns, data }) {
  
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // Sends the needed props to your table.
    getTableBodyProps, // Sends needed props to your table body
    headerGroups, // Returns normalized header groups
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row in order to be displayed.
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

}