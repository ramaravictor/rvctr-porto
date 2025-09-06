interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "info" | "warning";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "success",
  size = "md",
}) => {
  const variants = {
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`
      inline-flex items-center rounded-full border font-medium
      ${variants[variant]} ${sizes[size]}
    `}
    >
      {children}
    </span>
  );
};
