import Hero from "../../components/home/Hero";
import CategorySection from "../../components/home/CategorySection";
import BestSellerSection from "../../components/home/BestSellerSection";
import PromotionalBanner from "../../components/home/PromotionalBanner";
import NewArrivalSection from "../../components/home/NewArrivalSection";
import WhyChooseUs from "../../components/home/WhyChooseUs";


function Home() {
  return (
    <>
      <Hero />
      <CategorySection/>
      <BestSellerSection/>
      <PromotionalBanner/>
      <NewArrivalSection/>
      <WhyChooseUs />
    </>
  );
}

export default Home;