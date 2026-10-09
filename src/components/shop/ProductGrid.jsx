import ProductCard from "../product/ProductCard";

function ProductGrid({ products }) {
  return <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-7 xl:grid-cols-3">
    {products.map(product => <ProductCard key={product.id} product={product}/>)}
  </div>;
}
export default ProductGrid;
