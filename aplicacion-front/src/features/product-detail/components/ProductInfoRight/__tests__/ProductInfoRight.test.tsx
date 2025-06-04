import { render, screen } from '@testing-library/react';
import { ProductInfoRight } from '../ProductInfoRight'; // Ruta a tu componente ProductInfoRight
import type { Product } from '../../../types/product'; // Ruta a tu tipo Product

// --- MOCKS DE COMPONENTES HIJOS ---

// Mock para ProductBuy
// Usamos jest.fn() para poder inspeccionar las props pasadas.
jest.mock('../ProductBuy/ProductBuy', () => ({
  ProductBuy: jest.fn(({ buy_and_delivery, seller }) => (
    <div
      data-testid="mock-ProductBuy"
      data-delivery-title={buy_and_delivery?.delivery?.title} // Ejemplo de prop para verificar
      data-seller-nickname={seller}
    >
      Mock ProductBuy Content
    </div>
  )),
}));

// Importa el mock de ProductBuy para poder limpiarlo en beforeEach
import { ProductBuy } from '../ProductBuy/ProductBuy';

// --- FIN DE MOCKS ---

// Feature: Displaying Product Information on the Right Side
describe('Feature: Displaying Product Information on the Right Side', () => {
  // Datos de prueba para un objeto Product completo
  const mockProduct: Product = {
    id: 'prod123',
    title: 'Awesome Product',
    description: 'A very awesome product.',
    price: 100,
    currency: 'USD',
    pictures: [],
    breadcrumbs: [],
    more_actions: [],
    seller_info: {
      name: 'Awesome Seller',
      url: '/seller-url',
      rating: 4.9,
      nickname: 'AwesomeNick', // Asegúrate de que esta propiedad exista en tu tipo SellerInfo
      visitUs: 'Visit our store!',
    },
    buy_and_delivery: {
      // Asegúrate de que esta estructura coincida con tu tipo BuyAndDelivery
      delivery: {
        title: 'Envío Rápido',
        description: 'Llega en 2 días',
        calculate_shipping: 'Calcular',
        shipping_url: '#',
      },
      disponibility: {
        title: 'En stock',
      },
      actions: [{ text: 'Comprar', url: '#', is_primary: true }],
      benefits: null,
    },
    condition: 'new',
    sold_quantity: 50,
    badge_info: null,
    rating: { average: 4.5, total_reviews: 100 },
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
    // Limpia las llamadas al mock de ProductBuy antes de cada test
    (ProductBuy as jest.Mock).mockClear();
  });

  // Scenario: Component renders with a complete product object
  describe('Scenario: Component renders with a complete product object', () => {
    // Given: A ProductInfoRight component with a product object containing buy_and_delivery and seller_info.nickname
    const componentProps = { product: mockProduct };

    beforeEach(() => {
      // When: The component is rendered
      render(<ProductInfoRight {...componentProps} />);
    });

    it('Then: the ProductBuy component should be rendered', () => {
      // El ProductBuy mockeado debería estar en el documento
      expect(screen.getByTestId('mock-ProductBuy')).toBeInTheDocument();
    });

    it('And: the ProductBuy component should receive the correct buy_and_delivery and seller props', () => {
      expect(ProductBuy).toHaveBeenCalledWith(
        expect.objectContaining({
          buy_and_delivery: mockProduct.buy_and_delivery,
          seller: mockProduct.seller_info.nickname, // Espera ambas props en el mismo objeto
        }),
        undefined
      );
      // Las aserciones de `toHaveAttribute` en el mock renderizado siguen siendo válidas
      expect(screen.getByTestId('mock-ProductBuy')).toHaveAttribute(
        'data-delivery-title',
        mockProduct.buy_and_delivery.delivery.title
      );
      expect(screen.getByTestId('mock-ProductBuy')).toHaveAttribute(
        'data-seller-nickname',
        mockProduct.seller_info.nickname
      );
    });
  });

  // Scenario: Component renders without required seller_info.nickname or buy_and_delivery
  // This scenario tests error handling or fallback if these props are missing.
  // NOTE: Your component currently does not have explicit error handling for missing
  // product.seller_info.nickname or product.buy_and_delivery.
  // If these are always guaranteed to exist based on your API, this scenario might be less critical.
  // However, if they *can* be missing, you'd need to add error boundaries or conditional rendering
  // in ProductInfoRight to handle it gracefully.
  describe('Scenario: Component renders with missing data', () => {
    // Given: A ProductInfoRight component with a product missing seller_info.nickname
    const productMissingNickname: Product = {
      ...mockProduct,
      seller_info: {
        ...mockProduct.seller_info,
        nickname: undefined, // Simulate missing nickname
      },
    };

    // Given: A ProductInfoRight component with a product missing buy_and_delivery
    const productMissingBuyAndDelivery: Product = {
      ...mockProduct,
      buy_and_delivery: undefined as any, // Simulate missing buy_and_delivery
    };

    it('When: product.seller_info.nickname is missing, Then: ProductBuy should receive undefined for seller (or handle gracefully)', () => {
      // If ProductBuy expects a string, passing undefined might cause issues.
      // This test highlights the need for robust type checking or default values.
      render(<ProductInfoRight product={productMissingNickname} />);
      expect(ProductBuy).toHaveBeenCalledWith(
        expect.objectContaining({
          seller: undefined, // Expect undefined if nickname is missing
        }),
        undefined
      );
    });

    it('When: product.buy_and_delivery is missing, Then: ProductBuy should receive undefined for buy_and_delivery (or handle gracefully)', () => {
      // Similar to nickname, if ProductBuy expects a non-nullable object, this could cause errors.
      render(<ProductInfoRight product={productMissingBuyAndDelivery} />);
      expect(ProductBuy).toHaveBeenCalledWith(
        expect.objectContaining({
          buy_and_delivery: undefined, // Expect undefined if buy_and_delivery is missing
        }),
        undefined
      );
    });
  });
});
