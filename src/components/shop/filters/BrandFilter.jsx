import filters from "../../../data/filters";
import FilterSection from "./FilterSection";

function BrandFilter() {
  return (
    <FilterSection title="Brands">

      <div className="space-y-4">

        {filters.brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#C9A227]"
            />

            <span className="text-gray-600 group-hover:text-[#C9A227] transition">
              {brand}
            </span>

          </label>
        ))}

      </div>

    </FilterSection>
  );
}

export default BrandFilter;