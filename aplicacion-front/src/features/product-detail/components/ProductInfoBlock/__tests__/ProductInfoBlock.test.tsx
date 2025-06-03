import { render, screen } from '@testing-library/react';
import { ProductInfoBlock } from '../ProductInfoBlock';
import type { Product } from '../../../types/product'; // Asegúrate de que esta ruta sea correcta para tu tipo Product

// Mocks para los componentes hijos
// IMPORTANTE: Las rutas deben coincidir con las importaciones REALES en ProductInfoBlock.tsx
jest.mock('../ProductImageGallery/ProductImageGallery', () => ({
  ProductImageGallery: jest.fn(({ pictures, title }) => (
    <div data-testid="mock-product-image-gallery" data-pictures={JSON.stringify(pictures)} data-title={title}>
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
  // Datos de prueba para el componente Product
  const mockProduct: Product = {
    id: 'MLA123456789',
    title: 'Smartphone Test',
    description: 'A high-quality test smartphone.',
    price: 500.00,
    currency: 'USD',
    pictures: [
      { url: 'http://example.com/pic1.jpg', alt: 'Main pic' },
      { url: 'http://example.com/pic2.jpg', alt: 'Side pic' },
    ],
    rating: { average: 4.5, total_reviews: 100 },
    breadcrumbs: [],
    more_actions: [],
  };

  // Given: Un componente ProductInfoBlock
  describe('Given a ProductInfoBlock component', () => {

    // When: Es renderizado con un objeto product
    describe('When it is rendered with a product object', () => {
      beforeEach(() => {
        render(<ProductInfoBlock product={mockProduct} />);
      });

      // Then: Debe renderizar el contenedor principal
      test('Then it should render the main container div', () => {
        const container = screen.getByTestId('mock-product-image-gallery').parentElement; // El padre del gallery es el contenedor
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('product-info-section');
      });

      // Then: Debe renderizar el componente ProductImageGallery mockeado
      test('Then it should render the mocked ProductImageGallery component', () => {
        const gallery = screen.getByTestId('mock-product-image-gallery');
        expect(gallery).toBeInTheDocument();
        expect(gallery).toHaveTextContent('Mock Product Image Gallery');
      });

      // Then: Debe pasar las props correctas a ProductImageGallery
      test('Then it should pass the correct props to ProductImageGallery', () => {
        const gallery = screen.getByTestId('mock-product-image-gallery');
        expect(gallery).toHaveAttribute('data-title', mockProduct.title);
        // Para pictures, debido a que es un array, se stringify para pasar a data-attribute
        expect(gallery).toHaveAttribute('data-pictures', JSON.stringify(mockProduct.pictures));
      });

      // Then: Debe renderizar el componente ProductDetail mockeado
      test('Then it should render the mocked ProductDetail component', () => {
        const detail = screen.getByTestId('mock-product-detail');
        expect(detail).toBeInTheDocument();
        expect(detail).toHaveTextContent('Mock Product Detail');
      });

      // Then: Debe pasar la prop 'product' correcta a ProductDetail
      test('Then it should pass the correct "product" prop to ProductDetail', () => {
        const detail = screen.getByTestId('mock-product-detail');
        // Para verificar el objeto product completo, podemos pasar un ID o stringify si necesitamos todo el objeto
        // En este mock, pasamos solo el ID para simplificar la aserción
        expect(detail).toHaveAttribute('data-product-id', mockProduct.id);
        // Si ProductDetail necesitara más props, haríamos:
        // expect(detail).toHaveAttribute('data-product-name', mockProduct.name);
        // expect(detail).toHaveAttribute('data-product-price', String(mockProduct.price));
      });
    });

    // When: Se renderiza con un objeto product nulo o indefinido (si fuera posible)
    // Esto es útil si 'product' podría ser opcional
    describe('When rendered with a null product object', () => {
      // Simplemente para ilustrar si 'product' pudiera ser opcional
      // test('Then it should render an empty block', () => {
      //   render(<ProductInfoBlock product={null as any} />); // Forzando null para el test
      //   const container = screen.queryByClass('product-info-section');
      //   expect(container).toBeInTheDocument();
      //   expect(screen.queryByTestId('mock-product-image-gallery')).not.toBeInTheDocument();
      //   expect(screen.queryByTestId('mock-product-detail')).not.toBeInTheDocument();
      // });
    });
  });
});