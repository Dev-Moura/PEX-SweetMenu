import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { store } from "@/data/store";
import { getCategory } from "@/data/catalog";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/format";
import { Button } from "./ui/Button";
import { QuantityStepper } from "./ui/QuantityStepper";
import { EmptyState } from "./ui/EmptyState";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { CartIcon, CloseIcon, TrashIcon, WhatsappIcon } from "./ui/icons";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
  } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const checkoutLink = buildWhatsAppLink(
    store.whatsapp,
    buildOrderMessage(items, subtotal),
  );

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={closeCart}
        className="absolute inset-0 animate-fade-in bg-ink-900/40 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className="relative z-10 flex h-full w-full max-w-md animate-slide-in flex-col bg-cream shadow-card"
      >
        <header className="flex items-center justify-between gap-4 border-b border-ink-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <CartIcon className="text-brand-600" />
            <h2 className="text-lg font-bold text-ink-900">
              Seu carrinho
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-semibold text-ink-400">
                  {itemCount} {itemCount === 1 ? "item" : "itens"}
                </span>
              )}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100"
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-5">
            <EmptyState
              emoji="🛒"
              title="Seu carrinho está vazio"
              description="Explore o cardápio e a papelaria e adicione seus favoritos."
              action={
                <Link to="/menu" onClick={closeCart}>
                  <Button>Ver cardápio</Button>
                </Link>
              }
            />
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink-100 overflow-y-auto px-5">
              {items.map((item) => {
                const category = getCategory(item.product.category);
                return (
                  <li key={item.product.id} className="flex gap-3 py-4">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      emoji={item.product.emoji}
                      accent={category?.accent}
                      className="h-16 w-16 shrink-0 rounded-2xl"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-ink-900">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-ink-400">
                            {formatCurrency(item.product.price)} /{" "}
                            {item.product.unit ?? "un"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remover ${item.product.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
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
                        <span className="text-sm font-bold text-brand-600">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-ink-100 bg-white px-5 py-5">
              <div className="flex items-center justify-between text-base">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-display text-xl font-extrabold text-ink-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-400">
                O pagamento e a entrega são combinados pelo WhatsApp.
              </p>

              <a
                href={checkoutLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-colors hover:bg-[#1da851]"
              >
                <WhatsappIcon />
                Finalizar no WhatsApp
              </a>
              <Link
                to="/carrinho"
                onClick={closeCart}
                className="mt-2 block text-center text-sm font-semibold text-ink-500 transition-colors hover:text-brand-600"
              >
                Ver página do carrinho
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
