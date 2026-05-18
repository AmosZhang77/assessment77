/** Server-side cart state managed by MSW handlers */
export const cartState = {
  /** Total item count across all SKUs */
  count: 0,
  /** Per-SKU quantities already in the cart */
  items: new Map<string, number>(),

  getQuantity(skuId: string): number {
    return this.items.get(skuId) ?? 0;
  },

  add(skuId: string, quantity: number): void {
    const prev = this.getQuantity(skuId);
    this.items.set(skuId, prev + quantity);
    this.count += quantity;
  },

  reset(): void {
    this.count = 0;
    this.items.clear();
  },
};
