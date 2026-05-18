import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({
      cartCount: 0,
      status: 'idle',
      errorMessage: null,
    });
  });

  it('adds item successfully and updates cart count', async () => {
    await useCartStore.getState().addItem({
      productId: 'P001',
      skuId: 'SKU-001',
      quantity: 2,
    });

    const state = useCartStore.getState();
    expect(state.status).toBe('success');
    expect(state.cartCount).toBe(2);
  });

  it('returns error when SKU is out of stock', async () => {
    await useCartStore.getState().addItem({
      productId: 'P001',
      skuId: 'SKU-003',
      quantity: 1,
    });

    const state = useCartStore.getState();
    expect(state.status).toBe('error');
    expect(state.errorMessage).toMatch(/out of stock/i);
    expect(state.cartCount).toBe(0);
  });

  it('resets status to idle', async () => {
    await useCartStore.getState().addItem({
      productId: 'P001',
      skuId: 'SKU-001',
      quantity: 1,
    });

    useCartStore.getState().resetStatus();
    expect(useCartStore.getState().status).toBe('idle');
    expect(useCartStore.getState().errorMessage).toBeNull();
  });
});
