import {
  FaTruck,
  FaGem,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

function HeroFeatureBar() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Delivery",
    },
    {
      icon: <FaGem />,
      title: "Premium Quality",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
    },
  ];

  return (
    <section className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 justify-center"
          >
            <div className="text-2xl text-[#C9A227]">
              {item.icon}
            </div>

            <h3 className="font-semibold">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroFeatureBar;