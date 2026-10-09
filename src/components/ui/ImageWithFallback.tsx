import { useState } from "react";
import type { Accent } from "@/types";

const gradients: Record<Accent, string> = {
  brand: "from-brand-100 to-brand-50",
  accent: "from-accent-100 to-accent-50",
  paper: "from-paper-100 to-paper-50",
};

export function ImageWithFallback({
  src,
  alt,
  emoji,
  accent = "brand",
  className = "",
}: {
  src?: string;
  alt: string;
  emoji: string;
  accent?: Accent;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradients[accent]} ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-5xl drop-shadow-sm" aria-hidden>
            {emoji}
          </span>
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
