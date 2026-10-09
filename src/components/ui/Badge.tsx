import type { ReactNode } from "react";
import type { Accent } from "@/types";

const accents: Record<Accent, string> = {
  brand: "bg-brand-100 text-brand-700",
  accent: "bg-accent-100 text-accent-700",
  paper: "bg-paper-100 text-paper-700",
};

export function Badge({
  children,
  accent = "brand",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${accents[accent]} ${className}`}
    >
      {children}
    </span>
  );
}
