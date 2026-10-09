import { FaStar } from "react-icons/fa";

function ProductRating({ rating, reviews }) {
  return (
    <div className="mt-3 flex items-center gap-2">

      <FaStar className="text-yellow-500" />

      <span className="font-medium">
        {rating}
      </span>

      <span className="text-gray-500">
        ({reviews})
      </span>

    </div>
  );
}

export default ProductRating;