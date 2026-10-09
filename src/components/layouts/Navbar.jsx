import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import Container from "../common/Container";
import Logo from "../common/logo";
import navigation from "../../data/navigation";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const close = () => setOpen(false);
  const Nav = () => <>{navigation.map(link => <li key={link.path}><NavLink to={link.path} onClick={close} className={({isActive}) => `transition hover:text-[#C9A227] ${isActive ? "text-[#C9A227] font-semibold" : "text-gray-800"}`}>{link.name}</NavLink></li>)}</>;
  return <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
    <Container><nav className="flex items-center justify-between h-20"><Logo />
      <ul className="hidden lg:flex items-center gap-8"><Nav /></ul>
      <div className="hidden lg:flex items-center gap-5">
        <Link to="/shop" aria-label="Search"><FaSearch className="hover:text-[#C9A227]" /></Link>
        <Link to="/wishlist" className="relative"><FaHeart className="hover:text-[#C9A227]" />{wishlist.length>0&&<span className="badge">{wishlist.length}</span>}</Link>
        <Link to="/cart" className="relative"><FaShoppingCart className="hover:text-[#C9A227]" />{cartCount>0&&<span className="badge">{cartCount}</span>}</Link>
        <Link to="/login" className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2 hover:border-[#C9A227]"><FaUser size={13}/> Login</Link>
      </div>
      <div className="flex items-center gap-4 lg:hidden"><Link to="/cart" className="relative"><FaShoppingCart />{cartCount>0&&<span className="badge">{cartCount}</span>}</Link><button onClick={()=>setOpen(true)}><FaBars size={22}/></button></div>
    </nav></Container>
    {open&&<div className="fixed inset-0 bg-black/40 z-40" onClick={close}/>} 
    <aside className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ${open?"translate-x-0":"translate-x-full"}`}>
      <div className="p-6 flex items-center justify-between border-b"><Logo/><button onClick={close}><FaTimes size={22}/></button></div>
      <ul className="p-7 flex flex-col gap-6 text-lg"><Nav /></ul>
      <div className="px-7 border-t pt-6 space-y-4"><Link onClick={close} to="/wishlist" className="flex gap-3"><FaHeart/> Wishlist ({wishlist.length})</Link><Link onClick={close} to="/cart" className="flex gap-3"><FaShoppingCart/> Cart ({cartCount})</Link><Link onClick={close} to="/login" className="flex gap-3"><FaUser/> Account</Link></div>
    </aside>
  </header>;
}
export default Navbar;
