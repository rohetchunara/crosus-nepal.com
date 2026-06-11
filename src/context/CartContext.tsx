import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product, ProductColor } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedColor?: ProductColor) => void;
  removeItem: (productId: number, colorHex?: string) => void;
  updateQuantity: (productId: number, quantity: number, colorHex?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number = 1, selectedColor?: ProductColor) => {
    setItems((prev) => {
      const colorHex = selectedColor?.hex;
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          (item.selectedColor?.hex || null) === (colorHex || null)
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && (item.selectedColor?.hex || null) === (colorHex || null)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor }];
    });
  }, []);

  const removeItem = useCallback((productId: number, colorHex?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (item.selectedColor?.hex || null) === (colorHex || null))
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number, colorHex?: string) => {
    if (quantity <= 0) {
      removeItem(productId, colorHex);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && (item.selectedColor?.hex || null) === (colorHex || null)
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
