import { MinusIcon, PlusIcon } from "./icons";

const sizes = {
  sm: { btn: "h-8 w-8", value: "w-8 text-sm", icon: "h-4 w-4" },
  md: { btn: "h-10 w-10", value: "w-10 text-base", icon: "h-4 w-4" },
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  label = "quantidade",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: keyof typeof sizes;
  label?: string;
}) {
  const styles = sizes[size];

  return (
    <div
      className="inline-flex items-center rounded-full border border-ink-200 bg-white"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className={`flex items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 disabled:opacity-40 ${styles.btn}`}
      >
        <MinusIcon className={styles.icon} />
      </button>
      <span
        className={`text-center font-semibold text-ink-900 ${styles.value}`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
        className={`flex items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 disabled:opacity-40 ${styles.btn}`}
      >
        <PlusIcon className={styles.icon} />
      </button>
    </div>
  );
}
