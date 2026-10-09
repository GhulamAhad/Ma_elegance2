import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import BrandFilter from "./filters/BrandFilter";
import ColorFilter from "./filters/ColorFilter";
import SizeFilter from "./filters/SizeFilter";

function ShopSidebar({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <aside className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm space-y-8">

      <h2 className="text-2xl font-semibold">
        Filters
      </h2>

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <PriceFilter />

      <BrandFilter />

      <ColorFilter />

      <SizeFilter />

      <button className="w-full rounded-xl bg-[#111] py-3 text-white transition hover:bg-[#C9A227]">
        Clear Filters
      </button>

    </aside>
  );
}

export default ShopSidebar;