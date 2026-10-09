import Container from "../common/Container";
import FeatureCard from "./FeatureCard";
import features from "../../data/features";

function WhyChooseUs() {
  return (
    <section className="py-28 bg-[#F9F6F1]">

      <Container>

        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[5px] text-[#C9A227] text-sm font-semibold">
            Why Choose MA ELEGANCE
          </p>

          <h2
            className="mt-5 text-5xl font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Luxury Shopping Made Effortless
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            We combine premium craftsmanship, secure shopping,
            fast delivery and exceptional customer service to
            deliver a luxury experience every time.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-20">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}

export default WhyChooseUs;