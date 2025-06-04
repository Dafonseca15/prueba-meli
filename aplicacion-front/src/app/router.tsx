import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductDetailPage } from '../features/product-detail/pages/productDetailPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/" element={<Navigate to="/product/MLA123456789" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
