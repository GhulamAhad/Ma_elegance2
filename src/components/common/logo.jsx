function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-[#C9A227] flex items-center justify-center">
        <span className="text-white font-bold text-lg">M</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-wider text-[#111111]">
          MA ELEGANCE
        </h1>
        <p className="text-xs tracking-[4px] text-gray-500 uppercase">
          Affordable Luxury
        </p>
      </div>
    </div>
  );
}

export default Logo;