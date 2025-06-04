import { renderHook, waitFor } from '@testing-library/react';
import { useProductDetails } from '../useProductDetail'; // Ruta a tu custom hook
import { fetchProductDetails } from '../../api/productApi'; // Ruta a tu función de API
import { Product } from '../../types/product'; // Ruta a tu tipo Product

// --- MOCKS ---

// Mock para fetchProductDetails
jest.mock('../../api/productApi', () => ({
  fetchProductDetails: jest.fn(), // Mockeamos la función de la API
}));

// Importamos el mock para poder limpiarlo en beforeEach
import { fetchProductDetails as mockFetchProductDetails } from '../../api/productApi';

// --- FIN DE MOCKS ---

// Feature: Product Details Data Fetching
describe('Feature: Product Details Data Fetching', () => {
  // Datos de prueba para un producto
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
    // Limpia las llamadas al mock de la API antes de cada test
    mockFetchProductDetails.mockClear();
  });

  // Scenario: Initial state and no product ID
  describe('Scenario: Initial state and no product ID', () => {
    // Given: useProductDetails is called with an empty productId
    const productId = '';

    beforeEach(() => {
      // When: The hook is rendered
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

  // Scenario: Successful product fetch
  describe('Scenario: Successful product fetch', () => {
    const productId = 'valid-product-id';

    beforeEach(() => {
      // Given: fetchProductDetails successfully returns product data
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

  // Scenario: Failed product fetch
  describe('Scenario: Failed product fetch', () => {
    const productId = 'invalid-product-id';
    const errorMessage = 'Error de red o producto no encontrado';

    beforeEach(() => {
      // Given: fetchProductDetails throws an error
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

  // Scenario: Product ID changes
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
      // Given: fetchProductDetails successfully returns data for initial ID
      mockFetchProductDetails
        .mockResolvedValueOnce(initialProductData) // Primera llamada
        .mockResolvedValueOnce(newProductData); // Segunda llamada
    });

    it('When: the productId is updated, Then: it should re-initiate loading and refetch data', async () => {
      const { result, rerender } = renderHook(({ id }) => useProductDetails(id), {
        initialProps: { id: initialProductId },
      });

      // Initially loads the first product
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.product).toEqual(initialProductData);
        expect(mockFetchProductDetails).toHaveBeenCalledWith(initialProductId);
      });

      // Reset mock calls before rerendering with new ID
      mockFetchProductDetails.mockClear();

      // When: the productId is updated
      rerender({ id: newProductId });

      // Then: it should re-initiate loading
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // And: it should refetch product details with the new ID
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.product).toEqual(newProductData);
        expect(mockFetchProductDetails).toHaveBeenCalledTimes(1); // Only one call for the new ID
        expect(mockFetchProductDetails).toHaveBeenCalledWith(newProductId);
      });
    });
  });
});
