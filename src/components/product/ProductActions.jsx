import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

function ProductActions({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  return <div className="mt-3 sm:mt-6 flex gap-2 sm:gap-3">
    <button onClick={() => addToCart(product)} className="flex-1 flex items-center justify-center gap-1.5 sm:gap-3 rounded-xl bg-[#111] py-2.5 sm:py-3 text-xs sm:text-sm text-white transition hover:bg-[#C9A227]"><FaShoppingBag /> Add to Cart</button>
    <button aria-label="Wishlist" onClick={() => toggleWishlist(product)} className={`w-10 sm:w-12 rounded-xl border ${isWishlisted(product.id) ? "bg-[#C9A227] text-white border-[#C9A227]" : "border-gray-200"}`}><FaHeart /></button>
  </div>;
}
export default ProductActions;
