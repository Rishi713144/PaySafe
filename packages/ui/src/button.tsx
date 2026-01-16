"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const Button = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative w-full flex items-center justify-center gap-2
        rounded-md px-5 py-3 text-sm font-medium text-white
        transition-all duration-200
        ${
          isDisabled
            ? "cursor-not-allowed opacity-60"
            : "hover:brightness-110 active:scale-[0.98]"
        }
        bg-gradient-to-r from-blue-600 to-indigo-600
        focus:outline-none focus:ring-4 focus:ring-blue-300
      `}
    >
      {/* Spinner */}
      {loading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      )}

      {/* Text */}
      <span className={loading ? "opacity-70" : ""}>
        {children}
      </span>
    </button>
  );
};
