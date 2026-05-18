import { http, HttpResponse, delay } from 'msw';
import { MOCK_PRODUCT } from '../data/mockProduct';
import { cartState } from '../data/mockCart';

const RANDOM_FAIL_RATE = 0.3;

export const cartHandlers = [
  http.post('/api/cart', async ({ request }) => {
    await delay(800);

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

    if (Math.random() < RANDOM_FAIL_RATE) {
      return HttpResponse.json(
        { success: false, message: 'Server error. Please try again.' },
        { status: 500 }
      );
    }

    cartState.add(skuId, quantity);

    return HttpResponse.json({ success: true, cartCount: cartState.count });
  }),
];
