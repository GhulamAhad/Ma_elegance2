import { useLocation } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layouts/Footer";
import { CartProvider } from "./context/CartContext";
import { CatalogProvider } from "./context/CatalogContext";

function App(){
  const location=useLocation();
  const isAdmin=location.pathname.startsWith("/admin");
  return <CatalogProvider><CartProvider>{!isAdmin&&<Navbar/>}<AppRoutes/>{!isAdmin&&<Footer/>}</CartProvider></CatalogProvider>;
}
export default App;
