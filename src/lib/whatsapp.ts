import type { CartItem } from "@/types";
import { formatCurrency } from "@/lib/format";

export function buildOrderMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.product.name} — ${formatCurrency(
        item.product.price * item.quantity,
      )}`,
  );

  return [
    "Olá! Gostaria de fazer um pedido na Long River:",
    "",
    ...lines,
    "",
    `*Total: ${formatCurrency(total)}*`,
  ].join("\n");
}

export function buildWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
