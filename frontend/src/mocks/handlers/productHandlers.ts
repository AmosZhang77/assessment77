import { http, HttpResponse, delay } from 'msw';
import { MOCK_PRODUCT } from '../data/mockProduct';

export const productHandlers = [
  http.get('/api/product/:productId', async ({ params }) => {
    await delay(800);

    const { productId } = params;

    if (productId !== MOCK_PRODUCT.productId) {
      return HttpResponse.json(
        { message: `Product "${productId}" not found.` },
        { status: 404 }
      );
    }

    return HttpResponse.json(MOCK_PRODUCT);
  }),
];
