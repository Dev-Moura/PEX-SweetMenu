import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonClasses } from "@/components/ui/buttonClasses";
import { ArrowRightIcon, CartIcon } from "@/components/ui/icons";
import { catalog, getCategory, getProductById } from "@/data/catalog";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  useDocumentTitle(
    product ? product.name : "Produto não encontrado",
    product?.description,
  );

  if (!product) {
    return (
      <Container className="py-16">
        <EmptyState
          emoji="🤔"
          title="Produto não encontrado"
          description="Talvez ele tenha saído do catálogo. Veja outras opções deliciosas."
          action={
            <Link to="/menu" className={buttonClasses()}>
              Voltar ao cardápio
            </Link>
          }
        />
      </Container>
    );
  }

  const category = getCategory(product.category);
  const related = catalog
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

  const handleAdd = () => {
    addItem(product, quantity);
    showToast(`${quantity}x ${product.name} no carrinho`, "🛒");
    openCart();
  };

  return (
    <Container className="py-12">
      <nav aria-label="Trilha de navegação" className="mb-6 text-sm text-ink-400">
        <Link to="/" className="hover:text-brand-600">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link to="/menu" className="hover:text-brand-600">
          Cardápio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          emoji={product.emoji}
          accent={category?.accent}
          className="aspect-square w-full rounded-3xl shadow-soft"
        />

        <div className="flex flex-col gap-5">
          {category && <Badge accent={category.accent}>{category.label}</Badge>}

          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="text-ink-500">{product.description}</p>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-brand-600">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-ink-400">
              / {product.unit ?? "un"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              label={`Quantidade de ${product.name}`}
            />
            <button
              type="button"
              onClick={handleAdd}
              className={buttonClasses({ size: "lg" })}
            >
              <CartIcon />
              Adicionar · {formatCurrency(product.price * quantity)}
            </button>
          </div>

          <p className="text-sm text-ink-400">
            Pedido mínimo não exigido. Combine pagamento e entrega pelo
            WhatsApp.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Você também vai gostar"
              title="Outras opções"
            />
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Ver cardápio <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
