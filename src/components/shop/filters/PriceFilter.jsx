import FilterSection from "./FilterSection";

function PriceFilter() {
  return (
    <FilterSection title="Price">

      <input
        type="range"
        min="0"
        max="50000"
        className="w-full accent-[#C9A227]"
      />

      <div className="mt-3 flex justify-between text-sm text-gray-500">
        <span>Rs. 0</span>
        <span>Rs. 50,000</span>
      </div>

    </FilterSection>
  );
}

export default PriceFilter;