import filters from "../../../data/filters";
import FilterSection from "./FilterSection";

function SizeFilter() {
  return (
    <FilterSection title="Sizes">

      <div className="flex flex-wrap gap-3">

        {filters.sizes.map((size) => (
          <button
            key={size}
            className="px-4 py-2 rounded-lg border hover:bg-[#C9A227] hover:text-white hover:border-[#C9A227] transition"
          >
            {size}
          </button>
        ))}

      </div>

    </FilterSection>
  );
}

export default SizeFilter;