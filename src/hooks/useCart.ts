import { useState, useCallback, useMemo } from 'react';
import { product, orderBumps, PIX_DISCOUNT_PERCENTAGE, type OrderBump } from '@/data/products';

export interface CartItem {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
  selectedBumps: string[];
  paymentMethod: 'pix' | 'credit' | 'boleto';
}

export function useCart() {
  const [cart, setCart] = useState<CartState>({
    items: [
      {
        productId: product.id,
        name: product.name,
        description: `Preto Fosco - Tam. 58`,
        price: product.salePrice,
        quantity: 1,
        size: "58",
        color: "Preto Fosco",
        image: product.images[0],
      },
    ],
    selectedBumps: [],
    paymentMethod: 'pix',
  });

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ),
    }));
  }, []);

  const toggleBump = useCallback((bumpId: string) => {
    setCart((prev) => ({
      ...prev,
      selectedBumps: prev.selectedBumps.includes(bumpId)
        ? prev.selectedBumps.filter((id) => id !== bumpId)
        : [...prev.selectedBumps, bumpId],
    }));
  }, []);

  const setPaymentMethod = useCallback((method: CartState['paymentMethod']) => {
    setCart((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const subtotal = useMemo(() => {
    const itemsTotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const bumpsTotal = cart.selectedBumps.reduce((sum, bumpId) => {
      const bump = orderBumps.find((b) => b.id === bumpId);
      return sum + (bump?.salePrice || 0);
    }, 0);
    return itemsTotal + bumpsTotal;
  }, [cart.items, cart.selectedBumps]);

  const shippingCost = 0; // Frete grátis

  const pixDiscount = useMemo(() => {
    return cart.paymentMethod === 'pix' ? subtotal * PIX_DISCOUNT_PERCENTAGE : 0;
  }, [subtotal, cart.paymentMethod]);

  const total = useMemo(() => {
    return subtotal + shippingCost - pixDiscount;
  }, [subtotal, shippingCost, pixDiscount]);

  const itemCount = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0) + cart.selectedBumps.length;
  }, [cart.items, cart.selectedBumps]);

  const getSelectedBumps = useCallback((): OrderBump[] => {
    return orderBumps.filter((bump) => cart.selectedBumps.includes(bump.id));
  }, [cart.selectedBumps]);

  return {
    cart,
    updateQuantity,
    toggleBump,
    setPaymentMethod,
    subtotal,
    shippingCost,
    pixDiscount,
    total,
    itemCount,
    getSelectedBumps,
  };
}
