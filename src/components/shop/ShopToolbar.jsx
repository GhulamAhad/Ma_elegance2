import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function ShopToolbar() {
  return (
    <div>
      <SearchBar />

      <SortDropdown />

      <p>Showing 12 Products</p>
    </div>
  );
}

export default ShopToolbar;