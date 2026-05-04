"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  images?: string[];
  category?: string;
  description?: string;
}

interface ProductInput {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: string;
  description?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductInput) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("vh-cart");
    if (savedCart) {
      setTimeout(() => setCart(JSON.parse(savedCart)), 0);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("vh-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductInput) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`Increased quantity of ${product.name}`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`Added ${product.name} to Cart`);
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "/hero.png",
          quantity: 1,
          images: product.images,
          category: product.category,
          description: product.description,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const item = prev.find((p) => p.id === productId);
      if (item) toast.info(`Removed ${item.name} from Cart`);
      return prev.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart has been cleared");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
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
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
