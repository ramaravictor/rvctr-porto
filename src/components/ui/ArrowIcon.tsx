import { cn } from "@/lib/utils";

/** Diagonal arrow (↗). Rotate with className for other directions. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      aria-hidden="true"
      className={cn("h-[1em] w-[1em] shrink-0", className)}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
