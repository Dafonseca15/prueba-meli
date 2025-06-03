// src/AppRouter/__tests__/AppRouter.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Usamos MemoryRouter para pruebas de enrutamiento
import { AppRouter } from '../router'; // Ruta a tu componente AppRouter

const mockUseParams = jest.fn();

// *** REVISED MOCK FOR REACT-ROUTER-DOM ***
jest.mock("react-router-dom", () => {
  // Get the actual implementations of Routes, Route, etc.
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual, // Keep all other real exports (Routes, Route, etc.)
    useParams: () => mockUseParams(), // Mock useParams
    // Mock BrowserRouter to just render its children.
    // This allows MemoryRouter to be the top-level router in tests.
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-BrowserRouter-passthrough">{children}</div> // Use a testid for debugging if needed
    ),
  };
});

// Mock for ProductDetailPage
jest.mock("../../features/product-detail/pages/productDetailPage", () => ({
  ProductDetailPage: jest.fn(() => (
    <div data-testid="mock-ProductDetailPage">Mock ProductDetailPage Content</div>
  )),
}));

// Import the mock for ProductDetailPage to clear it in beforeEach
import { ProductDetailPage } from "../../features/product-detail/pages/productDetailPage";

// --- FIN DE MOCKS ---

// Feature: Application Routing
describe("Feature: Application Routing", () => {
  beforeEach(() => {
    (ProductDetailPage as jest.Mock).mockClear();
    mockUseParams.mockClear();
  });

  // Scenario: Product Detail Page is rendered for a specific product ID
  describe("Scenario: Product Detail Page is rendered for a specific product ID", () => {
    const productId = "test-product-id-123";
    const initialEntries = [`/product/${productId}`];

    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: productId });

      render(
        <MemoryRouter initialEntries={initialEntries}>
          <AppRouter /> {/* AppRouter will now use the mocked BrowserRouter */}
        </MemoryRouter>
      );
    });

    it("Then: the ProductDetailPage component should be rendered", () => {
      expect(screen.getByTestId("mock-ProductDetailPage")).toBeInTheDocument();
      expect(ProductDetailPage).toHaveBeenCalledTimes(1);
    });
  });

  // Scenario: Other paths do not render Product Detail Page
  describe("Scenario: Other paths do not render Product Detail Page", () => {
    const initialEntries = ["/some-other-path"];

    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={initialEntries}>
          <AppRouter />
        </MemoryRouter>
      );
    });

    it("Then: the ProductDetailPage component should NOT be rendered", () => {
      expect(screen.queryByTestId("mock-ProductDetailPage")).not.toBeInTheDocument();
      expect(ProductDetailPage).not.toHaveBeenCalled();
    });
  });
});