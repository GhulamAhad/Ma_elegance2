import hero from "../../assets/images/hero1.png";

function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Soft Gold Glow */}
      <div className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-[#C9A227]/15 blur-[100px]"></div>

      {/* Hero Image */}
      <img
        src={hero}
        alt="MA ELEGANCE"
        className="
          relative
          z-10
          w-[430px]
          lg:w-[500px]
          xl:w-[550px]
          object-contain
          drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]
        "
      />

      {/* Rating Card */}
      <div className="absolute top-10 left-0 lg:left-6 bg-white/95 backdrop-blur-md rounded-xl shadow-xl px-5 py-4 z-20">

        <p className="text-[#C9A227] text-sm tracking-wide">
          ★★★★★
        </p>

        <h4 className="text-lg font-semibold text-[#111]">
          4.9 Rating
        </h4>

        <p className="text-xs text-gray-500">
          Trusted Customers
        </p>

      </div>

      {/* Collection Card */}
      <div className="absolute bottom-8 right-0 lg:right-4 bg-[#111] text-white rounded-xl shadow-2xl px-6 py-4 z-20">

        <p className="text-[#C9A227] uppercase tracking-[3px] text-[10px]">
          New
        </p>

        <h3 className="text-lg font-medium mt-1">
          Collection
        </h3>

      </div>

    </div>
  );
}

export default HeroImage;