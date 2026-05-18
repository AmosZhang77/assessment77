import type { Product } from '../../types';

export const MOCK_PRODUCT: Product = {
  productId: 'P001',
  name: 'AerisPhone Pro Max',
  description:
    'Experience next-generation performance with AerisPhone Pro Max. Featuring a stunning OLED display, professional-grade camera system, and all-day battery life. Available in multiple colors and storage options to suit your lifestyle.',
  images: ['/images/p1.jpg', '/images/p2.jpg', '/images/p3.jpg'],
  variants: [
    { skuId: 'SKU-001', color: 'Midnight Black', size: '128GB', price: 999,  stock: 15 },
    { skuId: 'SKU-002', color: 'Midnight Black', size: '256GB', price: 1199, stock: 8  },
    { skuId: 'SKU-003', color: 'Midnight Black', size: '512GB', price: 1499, stock: 0  },
    { skuId: 'SKU-004', color: 'Pearl White',    size: '128GB', price: 999,  stock: 20 },
    { skuId: 'SKU-005', color: 'Pearl White',    size: '256GB', price: 1199, stock: 5  },
    { skuId: 'SKU-006', color: 'Pearl White',    size: '512GB', price: 1499, stock: 3  },
    { skuId: 'SKU-007', color: 'Alpine Green',   size: '128GB', price: 1049, stock: 0  },
    { skuId: 'SKU-008', color: 'Alpine Green',   size: '256GB', price: 1249, stock: 12 },
    { skuId: 'SKU-009', color: 'Alpine Green',   size: '512GB', price: 1549, stock: 7  },
  ],
};
