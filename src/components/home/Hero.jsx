import Container from "../common/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroFeatureBar from "./HeroFeatureBar";

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#F9F5EF]">

        {/* Background Decorations */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#E9D8C4]/40 blur-[150px]" />

        {/* Optional Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#C9A227_1px,transparent_1px)] [background-size:30px_30px]" />

        <Container>

          <div className="grid lg:grid-cols-2 items-center min-h-[78vh] gap-8 lg:gap-0">

            {/* Left */}
            <div className="relative z-10">
              <HeroContent />
            </div>

            {/* Right */}
            <div className="relative flex justify-end">
              <HeroImage />
            </div>

          </div>

        </Container>

      </section>

      <HeroFeatureBar />
    </>
  );
}

export default Hero;