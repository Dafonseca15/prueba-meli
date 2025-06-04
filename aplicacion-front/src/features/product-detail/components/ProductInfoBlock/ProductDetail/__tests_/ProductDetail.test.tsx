import { render, screen } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail';
import type { Product } from '../../../../types/product';

jest.mock('../VisitOurStore/VisitOurStore', () => ({
  VisitOurStore: jest.fn(({ seller_info }) => (
    <div data-testid="mock-VisitOurStore" data-seller-name={seller_info?.name} />
  )),
}));

jest.mock('../FavoriteSection/FavoriteSection', () => ({
  FavoriteSection: jest.fn(({ condition, sold_quantity }) => (
    <div
      data-testid="mock-FavoriteSection"
      data-condition={condition}
      data-sold-quantity={sold_quantity}
    />
  )),
}));

jest.mock('../BadgeCategory/BadgeCategory', () => ({
  BadgeCategory: jest.fn(({ badge_info }) => (
    <div
      data-testid="mock-BadgeCategory"
      data-badge-text={badge_info?.text}
      data-category-url={badge_info?.category_url}
    />
  )),
}));

jest.mock('../../../../../../components/CustomTitle/CustomTitle', () => ({
  CustomTitle: jest.fn(({ children, level, size, bold, marginBottom }) => (
    <h3
      data-testid="mock-CustomTitle"
      data-level={level}
      data-size={size}
      data-bold={bold}
      data-margin-bottom={marginBottom}
    >
      {children}
    </h3>
  )),
}));

jest.mock('../../../../../../components/Rating/Rating', () => ({
  Rating: jest.fn(({ rating }) => (
    <div
      data-testid="mock-Rating"
      data-average={rating?.average}
      data-total-reviews={rating?.total_reviews}
    />
  )),
}));

jest.mock('../ProductPurchaseDetails/ProductPurchaseDetails', () => ({
  ProductPurchaseDetails: jest.fn(({ purchase }) => (
    <div
      data-testid="mock-ProductPurchaseDetails"
      data-price={purchase?.price}
      data-available-quantity={purchase?.available_quantity}
    />
  )),
}));

jest.mock('../ProductColorSelector/ProductColorSelector', () => ({
  ProductColorSelector: jest.fn(({ color_selector }) => (
    <div
      data-testid="mock-ProductColorSelector"
      data-selected-color-name={color_selector?.selected_color?.name}
    />
  )),
}));

jest.mock('../ProductInfoKey/ProductInfoKey', () => ({
  ProductInfoKey: jest.fn(({ keyInfo }) => (
    <div data-testid="mock-ProductInfoKey" data-key-info-length={keyInfo?.length} />
  )),
}));

describe('ProductDetail Component (BDD Style)', () => {
  const mockProductFull: Product = {
    id: 'MLA123456789',
    title: 'iPhone 15 Pro Max 256 GB Nuevo',
    description: 'El último modelo de iPhone con todas las características.',
    price: 1500,
    currency: 'USD',
    pictures: [{ url: 'http://example.com/pic1.jpg' }],
    breadcrumbs: [{ id: 'cat1', name: 'Celulares' }],
    more_actions: [{ label: 'Comparar', url: '/compare' }],
    seller_info: { name: 'Apple Store Oficial', url: 'http://example.com/store', rating: 4.9 },
    condition: 'new',
    sold_quantity: 1250,
    badge_info: {
      text: 'MercadoLíder Platinum',
      category_url: '/ml',
      category_position: 'top',
      category_text: 'Vendedor',
    },
    rating: { average: 4.8, total_reviews: 2345 },
    purchase: {
      price: 1500,
      available_quantity: 10,
      installments_text: '12 cuotas sin interés',
      shipping_cost_text: 'Envío gratis',
    },
    color_selector: {
      available_colors: [
        { name: 'Titanio Natural', hex: '#E5DCCF' },
        { name: 'Titanio Azul', hex: '#3A465B' },
      ],
      selected_color: { name: 'Titanio Natural', hex: '#E5DCCF' },
    },
    keyInfo: [
      { label: 'Memoria RAM', value: '8 GB' },
      { label: 'Almacenamiento', value: '256 GB' },
      { label: 'Procesador', value: 'A17 Bionic' },
    ],
  };

  const mockProductMinimal: Product = {
    id: 'MLA987654321',
    title: 'Producto Básico',
    description: '',
    price: 0,
    currency: '',
    pictures: [],
    breadcrumbs: [],
    more_actions: [],
    rating: { average: 0, total_reviews: 0 },
  };

  describe('Given a ProductDetail component', () => {
    describe('When it is rendered with a full product object', () => {
      beforeEach(() => {
        render(<ProductDetail product={mockProductFull} />);
      });

      it('Then it should render the main container div', () => {
        const mainContainer = screen.getByTestId('product-info');
        expect(mainContainer).toBeInTheDocument();
        expect(mainContainer).toHaveClass('product-info');
      });

      it('Then it should render VisitOurStore with correct props', () => {
        const visitStoreMock = screen.getByTestId('mock-VisitOurStore');
        expect(visitStoreMock).toBeInTheDocument();
        expect(visitStoreMock).toHaveAttribute(
          'data-seller-name',
          mockProductFull.seller_info?.name
        );
      });

      it('Then it should render FavoriteSection with correct props', () => {
        const favSectionMock = screen.getByTestId('mock-FavoriteSection');
        expect(favSectionMock).toBeInTheDocument();
        expect(favSectionMock).toHaveAttribute('data-condition', mockProductFull.condition);
        expect(favSectionMock).toHaveAttribute(
          'data-sold-quantity',
          String(mockProductFull.sold_quantity)
        );
      });

      it('Then it should render BadgeCategory with correct props', () => {
        const badgeCategoryMock = screen.getByTestId('mock-BadgeCategory');
        expect(badgeCategoryMock).toBeInTheDocument();
        expect(badgeCategoryMock).toHaveAttribute(
          'data-badge-text',
          mockProductFull.badge_info?.text
        );
        expect(badgeCategoryMock).toHaveAttribute(
          'data-category-url',
          mockProductFull.badge_info?.category_url
        );
      });

      it('Then it should render CustomTitle with correct props and text', () => {
        const customTitleMock = screen.getByTestId('mock-CustomTitle');
        expect(customTitleMock).toBeInTheDocument();
        expect(customTitleMock).toHaveTextContent(mockProductFull.title);
        expect(customTitleMock).toHaveAttribute('data-level', 'h3');
        expect(customTitleMock).toHaveAttribute('data-size', '2xl');
        expect(customTitleMock).toHaveAttribute('data-bold', 'bold');
        expect(customTitleMock).toHaveAttribute('data-margin-bottom', '0.5rem');
      });

      it('Then it should render Rating with correct props', () => {
        const ratingMock = screen.getByTestId('mock-Rating');
        expect(ratingMock).toBeInTheDocument();
        expect(ratingMock).toHaveAttribute('data-average', String(mockProductFull.rating?.average));
        expect(ratingMock).toHaveAttribute(
          'data-total-reviews',
          String(mockProductFull.rating?.total_reviews)
        );
      });

      it('Then it should render ProductPurchaseDetails with correct props', () => {
        const purchaseDetailsMock = screen.getByTestId('mock-ProductPurchaseDetails');
        expect(purchaseDetailsMock).toBeInTheDocument();
        expect(purchaseDetailsMock).toHaveAttribute(
          'data-price',
          String(mockProductFull.purchase?.price)
        );
        expect(purchaseDetailsMock).toHaveAttribute(
          'data-available-quantity',
          String(mockProductFull.purchase?.available_quantity)
        );
      });

      it('Then it should render ProductColorSelector with correct props', () => {
        const colorSelectorMock = screen.getByTestId('mock-ProductColorSelector');
        expect(colorSelectorMock).toBeInTheDocument();
        expect(colorSelectorMock).toHaveAttribute(
          'data-selected-color-name',
          mockProductFull.color_selector?.selected_color?.name
        );
      });

      it('Then it should render ProductInfoKey with correct props', () => {
        const infoKeyMock = screen.getByTestId('mock-ProductInfoKey');
        expect(infoKeyMock).toBeInTheDocument();

        expect(infoKeyMock).toHaveAttribute(
          'data-key-info-length',
          String(mockProductFull.keyInfo?.length)
        );
      });
    });

    describe('When it is rendered with a minimal product object (no optional data)', () => {
      beforeEach(() => {
        render(<ProductDetail product={mockProductMinimal} />);
      });

      it('Then it should NOT render VisitOurStore', () => {
        expect(screen.queryByTestId('mock-VisitOurStore')).not.toBeInTheDocument();
      });

      it('Then it should NOT render FavoriteSection', () => {
        expect(screen.queryByTestId('mock-FavoriteSection')).not.toBeInTheDocument();
      });

      it('Then it should NOT render BadgeCategory', () => {
        expect(screen.queryByTestId('mock-BadgeCategory')).not.toBeInTheDocument();
      });

      it('Then it should render CustomTitle', () => {
        const customTitleMock = screen.getByTestId('mock-CustomTitle');
        expect(customTitleMock).toBeInTheDocument();
        expect(customTitleMock).toHaveTextContent(mockProductMinimal.title);
      });

      it('Then it should render Rating', () => {
        const ratingMock = screen.getByTestId('mock-Rating');
        expect(ratingMock).toBeInTheDocument();
      });

      it('Then it should NOT render ProductPurchaseDetails', () => {
        expect(screen.queryByTestId('mock-ProductPurchaseDetails')).not.toBeInTheDocument();
      });

      it('Then it should NOT render ProductColorSelector', () => {
        expect(screen.queryByTestId('mock-ProductColorSelector')).not.toBeInTheDocument();
      });

      it('Then it should NOT render ProductInfoKey', () => {
        expect(screen.queryByTestId('mock-ProductInfoKey')).not.toBeInTheDocument();
      });
    });
  });
});
