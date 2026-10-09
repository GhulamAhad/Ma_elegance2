function SortDropdown({ sortBy, setSortBy }) {

  return (

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >

      <option>Newest</option>

      <option>Price Low</option>

      <option>Price High</option>

      <option>Rating</option>

    </select>

  );

}

export default SortDropdown;