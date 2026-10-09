import { useCatalog } from "../../context/CatalogContext";
import Container from "../common/Container";
import ProductCard from "./ProductCard";

function RelatedProducts({ currentProduct }) {
  const {products}=useCatalog();

  const related = products.filter(
    (item) =>
      item.category === currentProduct.category &&
      item.id !== currentProduct.id
  );

  return (
    <section className="py-24">

      <Container>

        <h2 className="text-4xl font-bold mb-12">

          Related Products

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {related.map((product) => (

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

export default RelatedProducts;