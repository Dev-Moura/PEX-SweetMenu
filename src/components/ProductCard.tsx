import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { CartIcon } from "./ui/icons";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { formatCurrency } from "@/lib/format";
import { getCategory } from "@/data/catalog";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const category = getCategory(product.category);

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.name} adicionado ao carrinho`, "🛒");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/produto/${product.id}`} className="block">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          emoji={product.emoji}
          accent={category?.accent}
          className="h-40 w-full"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between gap-2">
          {category && <Badge accent={category.accent}>{category.label}</Badge>}
          <span className="font-display text-lg font-extrabold text-brand-600">
            {formatCurrency(product.price)}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug text-ink-900">
          <Link
            to={`/produto/${product.id}`}
            className="transition-colors hover:text-brand-600"
          >
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-ink-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Button onClick={handleAdd} size="sm" className="flex-1">
            <CartIcon className="h-4 w-4" />
            Adicionar
          </Button>
          <Link
            to={`/produto/${product.id}`}
            className="rounded-full px-3 py-2 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-100"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
}
