import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";

function ProductInfo({ product }) {
  return (
    <div className="mt-5">

      <p className="text-sm uppercase tracking-widest text-[#C9A227]">
        {product.brand}
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {product.name}
      </h3>

      <ProductRating
        rating={product.rating}
        reviews={product.reviews}
      />

      <ProductPrice
        price={product.price}
        oldPrice={product.oldPrice}
      />

    </div>
  );
}

export default ProductInfo;