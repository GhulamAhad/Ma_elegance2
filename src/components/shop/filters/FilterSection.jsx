function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 pb-8 last:border-none">

      <h3 className="mb-5 text-lg font-semibold text-[#111]">
        {title}
      </h3>

      {children}

    </div>
  );
}

export default FilterSection;