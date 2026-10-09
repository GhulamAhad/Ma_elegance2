import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import ProductCard from "../../components/product/ProductCard";
import { useCart } from "../../context/CartContext";
function Wishlist(){const {wishlist}=useCart(); return <main className="bg-[#FAF8F4] py-16"><Container><p className="gold-label">YOUR FAVORITES</p><h1 className="page-title text-[#111]">Wishlist</h1>{wishlist.length?<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-12">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="mt-10 bg-white rounded-3xl border p-16 text-center"><h2 className="text-3xl">Nothing saved yet.</h2><p className="text-gray-500 mt-3">Tap the heart on any product you love.</p><Link to="/shop" className="inline-block gold-button mt-7">Explore Products</Link></div>}</Container></main>}
export default Wishlist;
