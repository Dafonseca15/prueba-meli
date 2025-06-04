import { render, screen } from '@testing-library/react';
import { ProductInfoRight } from '../ProductInfoRight';
import type { Product } from '../../../types/product';
import { ProductBuy } from '../ProductBuy/ProductBuy';

jest.mock('../ProductBuy/ProductBuy', () => ({
  ProductBuy: jest.fn(({ buy_and_delivery, seller }) => (
    <div
      data-testid="mock-ProductBuy"
      data-delivery-title={buy_and_delivery?.delivery?.title}
      data-seller-nickname={seller}
    >
      Mock ProductBuy Content
    </div>
  )),
}));

describe('Feature: Displaying Product Information on the Right Side', () => {
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
      nickname: 'AwesomeNick',
      visitUs: 'Visit our store!',
    },
    buy_and_delivery: {
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
    (ProductBuy as jest.Mock).mockClear();
  });

  describe('Scenario: Component renders with a complete product object', () => {
    const componentProps = { product: mockProduct };

    beforeEach(() => {
      render(<ProductInfoRight {...componentProps} />);
    });

    it('Then: the ProductBuy component should be rendered', () => {
      expect(screen.getByTestId('mock-ProductBuy')).toBeInTheDocument();
    });

    it('And: the ProductBuy component should receive the correct buy_and_delivery and seller props', () => {
      expect(ProductBuy).toHaveBeenCalledWith(
        expect.objectContaining({
          buy_and_delivery: mockProduct.buy_and_delivery,
          seller: mockProduct.seller_info.nickname,
        }),
        undefined
      );

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

  describe('Scenario: Component renders with missing data', () => {
    const productMissingNickname: Product = {
      ...mockProduct,
      seller_info: {
        ...mockProduct.seller_info,
        nickname: undefined,
      },
    };

    const productMissingBuyAndDelivery: Product = {
      ...mockProduct,
      buy_and_delivery: undefined as any,
    };

    it('When: product.seller_info.nickname is missing, Then: ProductBuy should receive undefined for seller (or handle gracefully)', () => {
      render(<ProductInfoRight product={productMissingNickname} />);
      expect(ProductBuy).toHaveBeenCalledWith(
        expect.objectContaining({
          seller: undefined,
        }),
        undefined
      );
    });

    it('When: product.buy_and_delivery is missing, Then: ProductBuy should receive undefined for buy_and_delivery (or handle gracefully)', () => {
      render(<ProductInfoRight product={productMissingBuyAndDelivery} />);
      expect(ProductBuy).toHaveBeenCalledWith(
        expect.objectContaining({
          buy_and_delivery: undefined,
        }),
        undefined
      );
    });
  });
});
