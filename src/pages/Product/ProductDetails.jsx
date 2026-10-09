import { useParams } from "react-router-dom";

import { useCatalog } from "../../context/CatalogContext";

import Container from "../../components/common/Container";
import ProductGallery from "../../components/product/ProductGallery";
import ProductDetailsInfo from "../../components/product/ProductDetailsInfo";
import ProductTabs from "../../components/product/ProductTabs";
import RelatedProducts from "../../components/product/RelatedProducts";

function ProductDetails() {
  const { slug } = useParams();
  const { products } = useCatalog();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <Container>
        <div className="py-40 text-center">
          <h2 className="text-4xl font-bold">
            Product Not Found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <main className="bg-[#FAFAFA]">

      <section className="py-20">

        <Container>

          <div className="grid lg:grid-cols-2 gap-16">

            <ProductGallery product={product} />

            <ProductDetailsInfo product={product} />

          </div>

        </Container>

      </section>

      <ProductTabs product={product} />

      <RelatedProducts currentProduct={product} />

    </main>
  );
}

export default ProductDetails;