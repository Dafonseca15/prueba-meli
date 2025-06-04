import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../router';
import { ProductDetailPage } from '../../features/product-detail/pages/productDetailPage';

const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: () => mockUseParams(),
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-BrowserRouter-passthrough">{children}</div>
    ),
  };
});

jest.mock('../../features/product-detail/pages/productDetailPage', () => ({
  ProductDetailPage: jest.fn(() => (
    <div data-testid="mock-ProductDetailPage">Mock ProductDetailPage Content</div>
  )),
}));

describe('Feature: Application Routing', () => {
  beforeEach(() => {
    (ProductDetailPage as jest.Mock).mockClear();
    mockUseParams.mockClear();
  });

  describe('Scenario: Product Detail Page is rendered for a specific product ID', () => {
    const productId = 'test-product-id-123';
    const initialEntries = [`/product/${productId}`];

    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: productId });

      render(
        <MemoryRouter initialEntries={initialEntries}>
          <AppRouter />
        </MemoryRouter>
      );
    });

    it('Then: the ProductDetailPage component should be rendered', () => {
      expect(screen.getByTestId('mock-ProductDetailPage')).toBeInTheDocument();
      expect(ProductDetailPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scenario: Other paths do not render Product Detail Page', () => {
    const initialEntries = ['/some-other-path'];

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={initialEntries}>
          <AppRouter />
        </MemoryRouter>
      );
    });

    it('Then: the ProductDetailPage component should NOT be rendered', () => {
      expect(screen.queryByTestId('mock-ProductDetailPage')).not.toBeInTheDocument();
      expect(ProductDetailPage).not.toHaveBeenCalled();
    });
  });
});
