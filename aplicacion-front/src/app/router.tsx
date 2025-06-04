import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from '../features/product-detail/pages/productDetailPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
