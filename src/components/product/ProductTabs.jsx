import Container from "../common/Container";

function ProductTabs({ product }) {

  return (
    <section className="py-2 bg-white">

      <Container>

        <div className="border-b pb-5">

          <h2 className="text-3xl font-bold">

            Product Description

          </h2>

        </div>

        <p className="mt-8 text-gray-600 leading-8">

          {product.description}

        </p>

      </Container>

    </section>
  );
}

export default ProductTabs;