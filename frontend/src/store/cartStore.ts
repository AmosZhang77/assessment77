import { create } from 'zustand';
import { addToCart } from '../api/cartService';
import type { CartItem } from '../types';

type CartStatus = 'idle' | 'loading' | 'success' | 'error';

interface CartState {
  cartCount: number;
  status: CartStatus;
  errorMessage: string | null;

  addItem: (item: CartItem) => Promise<void>;
  resetStatus: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  status: 'idle',
  errorMessage: null,

  addItem: async (item) => {
    set({ status: 'loading', errorMessage: null });
    try {
      const res = await addToCart(item);
      if (res.success && res.cartCount !== undefined) {
        set({ status: 'success', cartCount: res.cartCount });
      } else {
        set({ status: 'error', errorMessage: res.message ?? 'Failed to add to cart.' });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
      set({ status: 'error', errorMessage: msg });
    }
  },

  resetStatus: () => set({ status: 'idle', errorMessage: null }),
}));
