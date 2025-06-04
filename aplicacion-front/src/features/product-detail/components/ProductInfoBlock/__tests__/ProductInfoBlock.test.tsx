import { render, screen } from '@testing-library/react';
import { ProductInfoBlock } from '../ProductInfoBlock';
import type { Product } from '../../../types/product';

jest.mock('../ProductImageGallery/ProductImageGallery', () => ({
  ProductImageGallery: jest.fn(({ pictures, title }) => (
    <div
      data-testid="mock-product-image-gallery"
      data-pictures={JSON.stringify(pictures)}
      data-title={title}
    >
      Mock Product Image Gallery
    </div>
  )),
}));

jest.mock('../ProductDetail/ProductDetail', () => ({
  ProductDetail: jest.fn(({ product }) => (
    <div data-testid="mock-product-detail" data-product-id={product.id}>
      Mock Product Detail
    </div>
  )),
}));

describe('ProductInfoBlock Component (BDD Style)', () => {
  const mockProduct: Product = {
    id: 'MLA123456789',
    title: 'Smartphone Test',
    description: 'A high-quality test smartphone.',
    price: 500.0,
    currency: 'USD',
    pictures: [
      { url: 'http://example.com/pic1.jpg', alt: 'Main pic' },
      { url: 'http://example.com/pic2.jpg', alt: 'Side pic' },
    ],
    rating: { average: 4.5, total_reviews: 100 },
    breadcrumbs: [],
    more_actions: [],
  };

  describe('Given a ProductInfoBlock component', () => {
    describe('When it is rendered with a product object', () => {
      beforeEach(() => {
        render(<ProductInfoBlock product={mockProduct} />);
      });

      test('Then it should render the main container div', () => {
        const container = screen.getByTestId('mock-product-image-gallery').parentElement;
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('product-info-section');
      });

      test('Then it should render the mocked ProductImageGallery component', () => {
        const gallery = screen.getByTestId('mock-product-image-gallery');
        expect(gallery).toBeInTheDocument();
        expect(gallery).toHaveTextContent('Mock Product Image Gallery');
      });

      test('Then it should pass the correct props to ProductImageGallery', () => {
        const gallery = screen.getByTestId('mock-product-image-gallery');
        expect(gallery).toHaveAttribute('data-title', mockProduct.title);

        expect(gallery).toHaveAttribute('data-pictures', JSON.stringify(mockProduct.pictures));
      });

      test('Then it should render the mocked ProductDetail component', () => {
        const detail = screen.getByTestId('mock-product-detail');
        expect(detail).toBeInTheDocument();
        expect(detail).toHaveTextContent('Mock Product Detail');
      });

      test('Then it should pass the correct "product" prop to ProductDetail', () => {
        const detail = screen.getByTestId('mock-product-detail');

        expect(detail).toHaveAttribute('data-product-id', mockProduct.id);
      });
    });
  });
});
