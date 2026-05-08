import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
  className?: string;
}

const variants = {
  default:
    "bg-violet-900/40 text-violet-300 border-violet-800",

  success:
    "bg-green-900/40 text-green-400 border-green-800",

  danger:
    "bg-red-900/40 text-red-400 border-red-800",

  warning:
    "bg-yellow-900/40 text-yellow-400 border-yellow-800",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: Props) {
  return (
    <span
      className={cn(
        "text-xs px-2 py-0.5 rounded-full border font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}