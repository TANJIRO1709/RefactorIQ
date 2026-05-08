import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-violet-600 hover:bg-violet-700 text-white",

  secondary:
    "border border-[#2a2a2a] hover:border-violet-600 text-gray-300",

  ghost:
    "text-gray-400 hover:text-white hover:bg-white/5",
};

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2
          size={14}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}