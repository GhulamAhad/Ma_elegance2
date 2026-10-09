import { Link } from "react-router-dom";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";

function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-2.5 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Clickable Area */}
      <Link to={`/product/${product.slug}`}>

        <ProductImage product={product} />

        <ProductInfo product={product} />

      </Link>

      {/* Button */}
      <ProductActions product={product} />

    </div>
  );
}

export default ProductCard;