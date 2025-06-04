import productData from '../../../data/mockProductData.json';
import { type Product } from '../types/product';

export const fetchProductDetails = (productId: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (productId === productData.id) {
        resolve(productData as unknown as Product);
      } else {
        reject(new Error('Producto no encontrado.'));
      }
    }, 500);
  });
};
