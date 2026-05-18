import client from './client';
import type { CartItem, AddToCartResponse } from '../types';

/**
 * POST /api/cart
 */
export async function addToCart(item: CartItem): Promise<AddToCartResponse> {
  const { data } = await client.post<AddToCartResponse>('/api/cart', item);
  return data;
}
