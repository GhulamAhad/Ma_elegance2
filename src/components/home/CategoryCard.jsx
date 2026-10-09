import { Link } from "react-router-dom";

function CategoryCard({ title, image, link }) {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-3xl h-[500px] shadow-lg"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Gold Border */}
      <div className="absolute inset-4 rounded-2xl border border-transparent group-hover:border-[#C9A227] transition duration-500"></div>

      {/* Content */}
      <div className="absolute bottom-10 left-8 z-10">
        <p className="text-sm uppercase tracking-[4px] text-[#C9A227]">
          MA ELEGANCE
        </p>

        <h2
          className="mt-2 text-3xl font-semibold text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>

        <span className="mt-6 inline-flex items-center text-white text-sm font-medium tracking-wider transition duration-300 group-hover:text-[#C9A227]">
          SHOP NOW →
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;