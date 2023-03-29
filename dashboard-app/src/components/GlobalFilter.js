export default function GlobalFilter({ filter, setFilter }) {
    return (
      <>
        <p> Search: </p>
        <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
      </>
    );
  }