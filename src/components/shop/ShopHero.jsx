import { Link } from "react-router-dom";
import Container from "../common/Container";
import heroBg from "../../assets/images/shop-hero.jpeg";

function ShopHero() {
  return (
    <section
      className="relative overflow-hidden h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#C9A227]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-[150px]" />

      <Container>

        <div className="relative z-10 text-center">

          <p className="uppercase tracking-[6px] text-[#C9A227] font-semibold text-sm">
            MA ELEGANCE
          </p>

          <h1
            className="mt-5 text-5xl lg:text-6xl font-semibold text-[#111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Luxury Collection
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-8">
            Explore our carefully curated collection of premium fashion,
            handbags, perfumes, jewelry and timeless accessories.
          </p>

          <div className="mt-8 flex justify-center items-center gap-3 text-sm">

            <Link
              to="/"
              className="text-gray-500 hover:text-[#C9A227] transition"
            >
              Home
            </Link>

            <span className="text-[#C9A227]">/</span>

            <span className="font-medium text-[#111]">
              Shop
            </span>

          </div>

        </div>

      </Container>

    </section>
  );
}

export default ShopHero;