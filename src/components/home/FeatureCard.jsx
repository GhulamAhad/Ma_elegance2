function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div
      className="
      group
      rounded-3xl
      bg-white
      p-10
      shadow-sm
      border
      border-transparent
      hover:border-[#C9A227]
      hover:-translate-y-2
      hover:shadow-2xl
      transition-all
      duration-500
      "
    >
      <div
        className="
        w-16
        h-16
        rounded-2xl
        bg-[#C9A227]/10
        flex
        items-center
        justify-center
        text-[#C9A227]
        mb-8
        group-hover:bg-[#C9A227]
        group-hover:text-white
        transition
        duration-500
        "
      >
        <Icon size={32} />
      </div>

      <h3
        className="text-2xl font-semibold text-[#111]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {feature.title}
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        {feature.description}
      </p>
    </div>
  );
}

export default FeatureCard;