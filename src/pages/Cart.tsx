import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { EmptyState } from "@/components/ui/EmptyState";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { buttonClasses } from "@/components/ui/buttonClasses";
import { TrashIcon, WhatsappIcon } from "@/components/ui/icons";
import { getCategory } from "@/data/catalog";
import { store } from "@/data/store";
import { formatCurrency } from "@/lib/format";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/hooks/useCart";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Cart() {
  useDocumentTitle(
    "Carrinho",
    "Revise os itens do seu pedido e finalize pelo WhatsApp.",
  );

  const { items, itemCount, subtotal, setQuantity, removeItem, clear } =
    useCart();

  const checkoutLink = buildWhatsAppLink(
    store.whatsapp,
    buildOrderMessage(items, subtotal),
  );

  return (
    <Container className="py-12">
      <header className="mb-8 flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          Seu pedido
        </span>
        <h1 className="text-4xl font-extrabold text-ink-900">Carrinho</h1>
        {itemCount > 0 && (
          <p className="text-ink-500">
            {itemCount} {itemCount === 1 ? "item" : "itens"} selecionados
          </p>
        )}
      </header>

      {items.length === 0 ? (
        <EmptyState
          emoji="🛒"
          title="Seu carrinho está vazio"
          description="Explore o cardápio e a papelaria para montar seu pedido."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/menu" className={buttonClasses()}>
                Ver cardápio
              </Link>
              <Link
                to="/servicos"
                className={buttonClasses({ variant: "outline" })}
              >
                Ver papelaria
              </Link>
            </div>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <section aria-label="Itens do carrinho" className="flex flex-col gap-4">
            {items.map((item) => {
              const category = getCategory(item.product.category);
              return (
                <article
                  key={item.product.id}
                  className="flex gap-4 rounded-3xl border border-ink-100 bg-white p-4 shadow-soft"
                >
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    emoji={item.product.emoji}
                    accent={category?.accent}
                    className="h-24 w-24 shrink-0 rounded-2xl"
                  />

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-bold leading-snug text-ink-900">
                          <Link
                            to={`/produto/${item.product.id}`}
                            className="hover:text-brand-600"
                          >
                            {item.product.name}
                          </Link>
                        </h2>
                        <p className="text-sm text-ink-400">
                          {formatCurrency(item.product.price)} /{" "}
                          {item.product.unit ?? "un"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remover ${item.product.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <QuantityStepper
                        size="sm"
                        value={item.quantity}
                        onChange={(quantity) =>
                          setQuantity(item.product.id, quantity)
                        }
                        label={`Quantidade de ${item.product.name}`}
                      />
                      <span className="font-bold text-brand-600">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              onClick={clear}
              className="self-start text-sm font-semibold text-ink-400 transition-colors hover:text-brand-600"
            >
              Limpar carrinho
            </button>
          </section>

          <aside className="sticky top-20 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-bold text-ink-900">Resumo</h2>

            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-500">Subtotal</dt>
                <dd className="font-semibold text-ink-900">
                  {formatCurrency(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-500">Entrega</dt>
                <dd className="text-ink-500">a combinar</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
              <span className="font-semibold text-ink-900">Total</span>
              <span className="font-display text-2xl font-extrabold text-brand-600">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <a
              href={checkoutLink}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({
                variant: "whatsapp",
                size: "lg",
                className: "mt-5 w-full",
              })}
            >
              <WhatsappIcon />
              Finalizar no WhatsApp
            </a>

            <Link
              to="/menu"
              className="mt-3 block text-center text-sm font-semibold text-ink-500 transition-colors hover:text-brand-600"
            >
              Continuar comprando
            </Link>
          </aside>
        </div>
      )}
    </Container>
  );
}
