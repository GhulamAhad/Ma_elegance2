function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const baseStyle =
    "px-6 py-3 rounded-md font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-[#C9A227] text-white hover:bg-[#b08d1d]",
    secondary:
      "border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;