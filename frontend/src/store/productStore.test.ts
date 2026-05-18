import { describe, it, expect, beforeEach } from 'vitest';
import { useProductStore } from './productStore';
import { MOCK_PRODUCT } from '../mocks/data/mockProduct';

describe('productStore', () => {
  beforeEach(() => {
    useProductStore.setState({
      product: null,
      loading: false,
      error: null,
      selectedVariants: { color: '', size: '' },
      currentSku: null,
      quantity: 1,
    });
  });

  it('loads product and selects first variant', async () => {
    await useProductStore.getState().fetchProduct('P001');

    const state = useProductStore.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.product?.name).toBe(MOCK_PRODUCT.name);
    expect(state.selectedVariants).toEqual({
      color: 'Midnight Black',
      size: '128GB',
    });
    expect(state.currentSku?.skuId).toBe('SKU-001');
    expect(state.quantity).toBe(1);
  });

  it('sets error when product is not found', async () => {
    await useProductStore.getState().fetchProduct('INVALID');

    const state = useProductStore.getState();
    expect(state.product).toBeNull();
    expect(state.error).toMatch(/not found/i);
  });

  it('updates SKU when variant changes', async () => {
    await useProductStore.getState().fetchProduct('P001');
    useProductStore.getState().setVariant('size', '256GB');

    const state = useProductStore.getState();
    expect(state.selectedVariants.size).toBe('256GB');
    expect(state.currentSku?.skuId).toBe('SKU-002');
    expect(state.quantity).toBe(1);
  });

  it('clamps quantity between 1 and stock', async () => {
    await useProductStore.getState().fetchProduct('P001');

    useProductStore.getState().setQuantity(99);
    expect(useProductStore.getState().quantity).toBe(15);

    useProductStore.getState().setQuantity(0);
    expect(useProductStore.getState().quantity).toBe(1);
  });
});
