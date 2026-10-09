import type { ReactNode } from "react";

export function EmptyState({
  emoji = "🍽️",
  title,
  description,
  action,
}: {
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      <h3 className="text-xl font-semibold text-ink-900">{title}</h3>
      {description && <p className="max-w-md text-ink-500">{description}</p>}
      {action}
    </div>
  );
}
