import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import NotFound from '../pages/NotFound/NotFound';

export const DEFAULT_PRODUCT_ID = 'P001';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/products/${DEFAULT_PRODUCT_ID}`} replace />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
