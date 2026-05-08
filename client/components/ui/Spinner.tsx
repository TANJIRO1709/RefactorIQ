import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export default function Spinner({
  className,
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin",
        className || ""
      )}
    />
  );
}