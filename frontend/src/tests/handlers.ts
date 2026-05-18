import { http, HttpResponse } from 'msw';
import { MOCK_PRODUCT } from '../mocks/data/mockProduct';
import { cartState } from '../mocks/data/mockCart';

/** Deterministic MSW handlers for tests (no delay, no random failures). */
export const testHandlers = [
  http.get('/api/product/:productId', ({ params }) => {
    const { productId } = params;

    if (productId !== MOCK_PRODUCT.productId) {
      return HttpResponse.json(
        { message: `Product "${productId}" not found.` },
        { status: 404 }
      );
    }

    return HttpResponse.json(MOCK_PRODUCT);
  }),

  http.post('/api/cart', async ({ request }) => {
    const body = (await request.json()) as {
      productId: string;
      skuId: string;
      quantity: number;
    };

    const { skuId, quantity } = body;
    const variant = MOCK_PRODUCT.variants.find((v) => v.skuId === skuId);

    if (!variant) {
      return HttpResponse.json(
        { success: false, message: 'SKU not found.' },
        { status: 400 }
      );
    }

    if (variant.stock <= 0) {
      return HttpResponse.json(
        { success: false, message: 'This item is out of stock.' },
        { status: 400 }
      );
    }

    const alreadyInCart = cartState.getQuantity(skuId);
    const totalRequested = alreadyInCart + quantity;

    if (totalRequested > variant.stock) {
      const remaining = variant.stock - alreadyInCart;
      const message =
        remaining <= 0
          ? `You already have all ${variant.stock} item(s) of this SKU in your cart.`
          : `Cannot add ${quantity} more — only ${remaining} item(s) remaining (${alreadyInCart} already in cart).`;

      return HttpResponse.json({ success: false, message }, { status: 400 });
    }

    cartState.add(skuId, quantity);
    return HttpResponse.json({ success: true, cartCount: cartState.count });
  }),
];
