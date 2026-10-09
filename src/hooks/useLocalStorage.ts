import { useCallback, useState } from "react";

type Updater<T> = T | ((previous: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const update = useCallback(
    (next: Updater<T>) => {
      setValue((previous) => {
        const resolved =
          typeof next === "function"
            ? (next as (current: T) => T)(previous)
            : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* armazenamento indisponível — ignora */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
