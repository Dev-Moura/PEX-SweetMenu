import { useEffect } from "react";
import { store } from "@/data/store";

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${store.shortName}` : store.name;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", description);
      }
    }
  }, [title, description]);
}
