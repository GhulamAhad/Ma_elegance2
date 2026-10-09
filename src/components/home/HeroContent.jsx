import { Link } from "react-router-dom";

function HeroContent() {
  return (
    <div className="max-w-[480px]">

      {/* Badge */}
      <span className="inline-flex items-center gap-3 text-[#C9A227] uppercase tracking-[4px] text-xs font-semibold">
        New Collection 2026
        <span className="w-10 h-[1px] bg-[#C9A227]"></span>
      </span>

      {/* Heading */}
      <h1
        className="mt-5 text-[42px] sm:text-[52px] lg:text-[60px] leading-[1] font-semibold text-[#111]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        MA
        <br />
        <span className="text-[#C9A227]">
          ELEGANCE
        </span>
      </h1>

      {/* Subtitle */}
      <h2 className="mt-6 text-[22px] lg:text-[28px] font-normal leading-snug text-gray-800">
        Affordable Luxury
        <br />
        For Every Woman
      </h2>

      {/* Description */}
      <p className="mt-5 text-[15px] leading-7 text-gray-600 max-w-[430px]">
        Discover our exclusive collection of perfumes and jewelry crafted with elegance and timeless style.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">

        <Link to="/shop">
          <button className="bg-black text-white px-7 py-3 rounded-md text-sm font-medium tracking-wider hover:bg-[#C9A227] transition-all duration-300">
            SHOP NOW →
          </button>
        </Link>

        <Link to="/collections">
          <button className="border border-black px-7 py-3 rounded-md text-sm font-medium tracking-wider hover:bg-black hover:text-white transition-all duration-300">
            EXPLORE
          </button>
        </Link>

      </div>

      {/* Stats */}
      <div className="flex gap-8 mt-7 border-t border-gray-200 pt-6">

        <div>
          <h3 className="text-x font-semibold text-[#111]">
            10K+
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Customers
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#111]">
            500+
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Products
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#111]">
            98%
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Satisfaction
          </p>
        </div>

      </div>

    </div>
  );
}

export default HeroContent;