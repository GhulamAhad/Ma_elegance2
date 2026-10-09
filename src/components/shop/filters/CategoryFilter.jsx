import filters from "../../../data/filters";
import FilterSection from "./FilterSection";

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <FilterSection title="Categories">
      <div className="space-y-3">

        {/* All Categories */}
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          className={`w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-300 ${
            selectedCategory === "All"
              ? "bg-[#C9A227] text-white shadow-md"
              : "bg-gray-50 text-gray-700 hover:bg-[#C9A227]/10 hover:text-[#C9A227]"
          }`}
        >
          All Products
        </button>

        {/* Categories */}
        {filters.categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#C9A227] text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-[#C9A227]/10 hover:text-[#C9A227]"
            }`}
          >
            {category}
          </button>
        ))}

      </div>
    </FilterSection>
  );
}

export default CategoryFilter;