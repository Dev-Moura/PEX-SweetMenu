import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "@/types";
import { CartContext, type CartContextValue } from "./cart-context";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "longriver:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback<CartContextValue["addItem"]>(
    (product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find(
          (item) => item.product.id === product.id,
        );
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { product, quantity }];
      });
    },
    [setItems],
  );

  const removeItem = useCallback<CartContextValue["removeItem"]>(
    (productId) => {
      setItems((current) =>
        current.filter((item) => item.product.id !== productId),
      );
    },
    [setItems],
  );

  const setQuantity = useCallback<CartContextValue["setQuantity"]>(
    (productId, quantity) => {
      setItems((current) => {
        if (quantity <= 0) {
          return current.filter((item) => item.product.id !== productId);
        }
        return current.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        );
      });
    },
    [setItems],
  );

  const clear = useCallback<CartContextValue["clear"]>(() => {
    setItems([]);
  }, [setItems]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );
    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
      openCart,
      closeCart,
    };
  }, [
    items,
    isOpen,
    addItem,
    removeItem,
    setQuantity,
    clear,
    openCart,
    closeCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
