import Container from "../common/Container";
import CategoryCard from "./CategoryCard";
import categories from "../../data/categories";

function CategorySection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-[#C9A227] text-sm font-semibold">
            Shop By Category
          </p>

          <h2
            className="mt-4 text-4xl lg:text-5xl font-semibold text-[#111]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover Luxury Collections
          </h2>

          <div className="w-24 h-[2px] bg-[#C9A227] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategorySection;