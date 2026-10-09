import { useMemo, useState } from "react";
import type { Category, Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./ui/EmptyState";
import { SearchIcon } from "./ui/icons";

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-brand-600 text-white shadow-soft"
          : "bg-white text-ink-600 hover:bg-ink-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function CatalogView({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("todos");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        active === "todos" || product.category === active;
      const matchesQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, active]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome ou descrição..."
            aria-label="Buscar produtos"
            className="w-full rounded-full border border-ink-200 bg-white py-3 pl-12 pr-4 text-sm text-ink-800 shadow-soft outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={active === "todos"}
            onClick={() => setActive("todos")}
          >
            Todos
          </FilterChip>
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              active={active === category.id}
              onClick={() => setActive(category.id)}
            >
              {category.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          emoji="🔍"
          title="Nada encontrado"
          description="Tente outro termo de busca ou selecione outra categoria."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
