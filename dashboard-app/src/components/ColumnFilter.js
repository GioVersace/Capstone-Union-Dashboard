export default function ColumnFilter({ column }) {
    const { filterValue, setFilter, preFilteredRows } = column;
    const count = preFilteredRows.length;
    return (
      <>
        <p> Search </p>
        <input
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`${count} results`}
        />
      </>
    );
  }