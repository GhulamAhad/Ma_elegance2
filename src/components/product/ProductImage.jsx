import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

function ProductImage({ product }) {
  const {toggleWishlist,isWishlisted}=useCart();
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#F8F8F8]">

      {/* Badges */}
      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">

        {product.isNew && (
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}

        {product.discount > 0 && (
          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}

      </div>

      {/* Wishlist */}
      <button className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#C9A227] hover:text-white">
        <FaHeart />
      </button>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-52 sm:h-64 lg:h-80 w-full object-cover transition duration-500 hover:scale-110"
      />

    </div>
  );
}

export default ProductImage;