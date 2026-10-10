
import { useState } from "react";

import Container from "../common/Container";
import ProductCard from "./ProductCard";
import FilterButtons from "./FilterButtons";
import { useCatalog } from "../../context/CatalogContext";

function NewArrivalSection() {
  const { products } = useCatalog();
  const [active, setActive] = useState("All");

  // Prevent crashes if the catalog value isn't an array.
  const safeProducts = Array.isArray(products) ? products : [];

  const newArrivals = safeProducts.filter((p) => p.isNew);

  const filteredProducts =
    active === "All"
      ? newArrivals
      : newArrivals.filter((item) => item.category === active);

  // Keep your existing return (...) JSX below this line.


  return (
    <section className="py-24 bg-white">

      <Container>

        <div className="text-center mb-12">

          <p className="uppercase tracking-[5px] text-[#C9A227] text-sm font-semibold">
            New Arrivals
          </p>

          <h2
            className="mt-4 text-5xl font-semibold"
            style={{ fontFamily: "Playfair Display", fontStyle: "serif" }}
          >
            Discover Our Latest Collection
          </h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
            Fresh arrivals carefully selected to bring elegance,
            confidence and luxury to your wardrobe.
          </p>

        </div>

        <FilterButtons
          active={active}
          setActive={setActive}
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}

export default NewArrivalSection;