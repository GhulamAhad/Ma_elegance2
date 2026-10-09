import { Link } from "react-router-dom";
import banner from "../../assets/images/banner/banner.png";
import Container from "../common/Container";

function PromotionalBanner() {
  return (
    <section className="py-24 bg-[#111111] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 items-center gap-12">

          {/* Left */}
          <div>

            <p className="uppercase tracking-[5px] text-[#C9A227] text-sm font-semibold">
              Summer Collection 2026
            </p>

            <h2
              className="mt-5 text-5xl lg:text-6xl text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Elevate
              <br />
              Your Everyday Style
            </h2>

            <p className="mt-6 text-gray-300 text-lg leading-8 max-w-lg">
              Discover premium perfumes and jewelry crafted for elegance and confidence.
            </p>

            <Link to="/collections">
              <button className="mt-10 bg-[#C9A227] hover:bg-[#b38f1f] transition text-white px-8 py-4 rounded-md tracking-widest uppercase">
                Explore Collection
              </button>
            </Link>

          </div>

          {/* Right */}
          <div className="relative">

            <img
              src={banner}
              alt="Luxury Banner"
              className="rounded-3xl shadow-2xl object-cover"
            />

          </div>

        </div>
      </Container>
    </section>
  );
}

export default PromotionalBanner;