import client from './client';
import type { Product } from '../types';

/**
 * GET /api/product/:productId
 */
export async function getProductDetail(productId: string): Promise<Product> {
  const { data } = await client.get<Product>(`/api/product/${productId}`);
  return data;
}
