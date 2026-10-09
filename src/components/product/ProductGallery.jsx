import { useState } from "react";

function ProductGallery({ product }) {

  const [selectedImage] = useState(product.image);

  return (
    <div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-lg">

        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
        />

      </div>

      <div className="flex gap-4 mt-6">

        <button className="border-2 border-[#C9A227] rounded-2xl overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover"
          />

        </button>

      </div>

    </div>
  );
}

export default ProductGallery;