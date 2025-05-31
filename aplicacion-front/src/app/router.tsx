import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from '../features/product-detail/pages/productDetailPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        {/* <Route path="/products/:id" element={<h1>Product Detail Page</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}