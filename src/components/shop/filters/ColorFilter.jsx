import filters from "../../../data/filters";
import FilterSection from "./FilterSection";

function ColorFilter() {
  return (
    <FilterSection title="Colors">

      <div className="flex flex-wrap gap-4">

        {filters.colors.map((color) => (
          <button
            key={color}
            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition"
            style={{ backgroundColor: color }}
          />
        ))}

      </div>

    </FilterSection>
  );
}

export default ColorFilter;