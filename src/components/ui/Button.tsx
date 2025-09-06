"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
