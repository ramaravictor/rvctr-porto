interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  return (
    <div
      className={`
      bg-white rounded-2xl shadow-sm border border-gray-100
      ${
        hover
          ? "hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          : ""
      }
      ${className}
    `}
    >
      {children}
    </div>
  );
};
