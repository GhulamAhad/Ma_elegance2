function FilterButtons({ active, setActive }) {
  const filters = [
    "All",
    "Perfume",
    "Bag",
    "Jewelry",
    "Watch",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-14">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`px-6 py-3 rounded-full transition duration-300 font-medium ${
            active === item
              ? "bg-[#C9A227] text-white"
              : "bg-gray-100 hover:bg-[#C9A227] hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;