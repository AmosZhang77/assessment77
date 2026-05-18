import { create } from 'zustand';
import type { Product, Variant, SelectedVariants } from '../types';
import { getProductDetail } from '../api/productService';

interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  selectedVariants: SelectedVariants;
  currentSku: Variant | null;
  quantity: number;

  fetchProduct: (productId: string) => Promise<void>;
  setVariant: (dimension: keyof SelectedVariants, value: string) => void;
  setQuantity: (qty: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  product: null,
  loading: false,
  error: null,
  selectedVariants: { color: '', size: '' },
  currentSku: null,
  quantity: 1,

  fetchProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const product = await getProductDetail(productId);
      const firstVariant = product.variants[0];
      const selectedVariants: SelectedVariants = {
        color: firstVariant.color,
        size: firstVariant.size,
      };
      set({
        product,
        loading: false,
        selectedVariants,
        currentSku: firstVariant,
        quantity: 1,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load product.';
      set({ loading: false, error: message });
    }
  },

  setVariant: (dimension, value) => {
    const { product, selectedVariants } = get();
    if (!product) return;

    const next = { ...selectedVariants, [dimension]: value };

    const sku = product.variants.find(
      (v) => v.color === next.color && v.size === next.size
    );

    set({ selectedVariants: next, currentSku: sku ?? null, quantity: 1 });
  },

  setQuantity: (qty) => {
    const { currentSku } = get();
    if (!currentSku) return;
    const clamped = Math.max(1, Math.min(qty, currentSku.stock));
    set({ quantity: clamped });
  },
}));
