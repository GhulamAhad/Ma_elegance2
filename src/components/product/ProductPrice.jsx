function ProductPrice({ price, oldPrice }) {
  return (
    <div className="mt-4 flex items-center gap-3">

      <span className="text-2xl font-bold text-[#111]">
        Rs. {price}
      </span>

      {oldPrice && (
        <span className="text-gray-400 line-through">
          Rs. {oldPrice}
        </span>
      )}

    </div>
  );
}

export default ProductPrice;