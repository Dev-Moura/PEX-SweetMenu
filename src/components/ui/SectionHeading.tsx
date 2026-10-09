export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base text-ink-500">{description}</p>
      )}
    </div>
  );
}
