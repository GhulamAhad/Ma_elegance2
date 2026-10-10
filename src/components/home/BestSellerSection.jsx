import Container from "../common/Container";
import ProductCard from "./ProductCard";
import { useCatalog } from "../../context/CatalogContext";

function BestSellerSection() {
  const { products } = useCatalog();
  return (
    <section className="py-28 bg-[#FAF8F4]">

      <Container>

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-[#C9A227] text-sm font-semibold">
            Best Sellers
          </p>

          <h2
            className="text-5xl mt-4 font-semibold"
            style={{ fontFamily: "Playfair Display" }}
          >
            Our Most Loved Products
          </h2>

          <p className="mt-5 text-gray-500 max-w-xl mx-auto">
            Explore our premium collection selected by thousands of happy customers.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

        </div>

      </Container>

    </section>
  );
}

export default BestSellerSection;