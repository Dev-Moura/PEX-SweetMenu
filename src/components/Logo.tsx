import { Link } from "react-router-dom";
import { store } from "@/data/store";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${store.name} — página inicial`}
      className={`group flex items-center gap-2.5 ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-lg shadow-soft transition-transform duration-300 group-hover:-rotate-6">
        🧁
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold text-ink-900">
          Long River
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
          Doceria &amp; Papelaria
        </span>
      </span>
    </Link>
  );
}
