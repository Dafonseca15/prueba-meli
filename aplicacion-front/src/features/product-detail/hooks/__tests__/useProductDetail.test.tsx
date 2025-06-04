import { renderHook, waitFor } from '@testing-library/react';
import { useProductDetails } from '../useProductDetail';
import { fetchProductDetails as mockFetchProductDetails } from '../../api/productApi';
import { Product } from '../../types/product';

jest.mock('../../api/productApi', () => ({
  fetchProductDetails: jest.fn(),
}));

describe('Feature: Product Details Data Fetching', () => {
  const mockProduct: Product = {
    id: 'MLA123456789',
    title: 'Producto de Prueba',
    description: 'Descripción del producto',
    price: 100,
    currency: 'USD',
    pictures: [],
    breadcrumbs: { items: [], more_actions: { more_actions: [] } },
    more_actions: [],
    seller_info: { name: 'Vendedor', url: '#', rating: 5, nickname: 'seller1', visitUs: 'Visita' },
    buy_and_delivery: {
      delivery: {
        title: 'Envío',
        description: 'Desc',
        calculate_shipping: null,
        shipping_url: null,
      },
      disponibility: { title: 'Disp' },
      actions: [],
      benefits: null,
    },
    interest: null,
    condition: 'new',
    sold_quantity: 10,
    badge_info: null,
    rating: { average: 4, total_reviews: 10 },
    purchase: {
      amount: 100,
      currency: 'USD',
      decimals: 2,
      original_amount: null,
      installments: null,
      discount_percentage: null,
      promotion: null,
    },
    color_selector: null,
    keyInfo: null,
  };

  beforeEach(() => {
    mockFetchProductDetails.mockClear();
  });

  describe('Scenario: Initial state and no product ID', () => {
    const productId = '';

    beforeEach(() => {
      renderHook(() => useProductDetails(productId));
    });

    it('Then: it should set loading to false', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it('And: it should set an error message indicating a missing ID', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.error).toBe('El ID del producto es requerido'));
    });

    it('And: it should not call fetchProductDetails', async () => {
      renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(mockFetchProductDetails).not.toHaveBeenCalled());
    });
  });

  describe('Scenario: Successful product fetch', () => {
    const productId = 'valid-product-id';

    beforeEach(() => {
      mockFetchProductDetails.mockResolvedValue(mockProduct);
    });

    it('When: the hook is rendered, Then: it should initially set loading to true', () => {
      const { result } = renderHook(() => useProductDetails(productId));
      expect(result.current.loading).toBe(true);
    });

    it('And: after fetching, it should set loading to false', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it('And: it should set the product data', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.product).toEqual(mockProduct));
    });

    it('And: it should clear any error', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.error).toBeNull());
    });

    it('And: fetchProductDetails should be called with the correct ID', async () => {
      renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(mockFetchProductDetails).toHaveBeenCalledWith(productId));
    });
  });

  describe('Scenario: Failed product fetch', () => {
    const productId = 'invalid-product-id';
    const errorMessage = 'Error de red o producto no encontrado';

    beforeEach(() => {
      mockFetchProductDetails.mockRejectedValue(new Error(errorMessage));
    });

    it('When: the hook is rendered, Then: it should initially set loading to true', () => {
      const { result } = renderHook(() => useProductDetails(productId));
      expect(result.current.loading).toBe(true);
    });

    it('And: after fetching, it should set loading to false', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it('And: it should set an error message', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.error).toBe(errorMessage));
    });

    it('And: it should not set product data', async () => {
      const { result } = renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(result.current.product).toBeNull());
    });

    it('And: fetchProductDetails should be called with the correct ID', async () => {
      renderHook(() => useProductDetails(productId));
      await waitFor(() => expect(mockFetchProductDetails).toHaveBeenCalledWith(productId));
    });
  });

  describe('Scenario: Product ID changes', () => {
    const initialProductId = 'initial-id';
    const newProductId = 'new-id';
    const initialProductData: Product = {
      ...mockProduct,
      id: initialProductId,
      title: 'Initial Product',
    };
    const newProductData: Product = { ...mockProduct, id: newProductId, title: 'New Product' };

    beforeEach(() => {
      mockFetchProductDetails
        .mockResolvedValueOnce(initialProductData)
        .mockResolvedValueOnce(newProductData);
    });

    it('When: the productId is updated, Then: it should re-initiate loading and refetch data', async () => {
      const { result, rerender } = renderHook(({ id }) => useProductDetails(id), {
        initialProps: { id: initialProductId },
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.product).toEqual(initialProductData);
        expect(mockFetchProductDetails).toHaveBeenCalledWith(initialProductId);
      });

      mockFetchProductDetails.mockClear();

      rerender({ id: newProductId });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.product).toEqual(newProductData);
        expect(mockFetchProductDetails).toHaveBeenCalledTimes(1);
        expect(mockFetchProductDetails).toHaveBeenCalledWith(newProductId);
      });
    });
  });
});
