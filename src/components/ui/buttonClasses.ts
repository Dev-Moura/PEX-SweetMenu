export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white shadow-soft hover:bg-brand-700",
  secondary: "bg-ink-900 text-white hover:bg-ink-800",
  outline: "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
  ghost: "text-ink-700 hover:bg-ink-100",
  whatsapp: "bg-[#25d366] text-white hover:bg-[#1da851]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}
