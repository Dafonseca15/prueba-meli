import { render, screen } from '@testing-library/react';
import { ProductDetailPage } from '../ProductDetailPage';
import type { Product } from '../../types/product';

// --- MOCKS DE HOOKS Y COMPONENTES HIJOS ---

// Mock para useParams de react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantiene otras exportaciones reales si las hay
  useParams: jest.fn(), // Mockea useParams
}));

// Mock para useProductDetails (tu custom hook)
jest.mock("../../hooks/useProductDetail", () => ({
  useProductDetails: jest.fn(), // Mockea useProductDetails
}));

// Mocks para los componentes hijos
jest.mock("../../components/ProductInfoBlock/ProductInfoBlock", () => ({
  ProductInfoBlock: jest.fn(({ product }) => (
    <div data-testid="mock-ProductInfoBlock" data-product-id={product?.id}>
      Mock ProductInfoBlock
    </div>
  )),
}));

jest.mock("../../../../components/ProductInterestRow/ProductInterestRow", () => ({
  ProductInterestRow: jest.fn(({ title, items }) => (
    <div data-testid="mock-ProductInterestRow" data-title={title} data-item-count={items?.length}>
      Mock ProductInterestRow
    </div>
  )),
}));

jest.mock("../../../../components/Breadcrumbs/Breadcrumbs", () => ({
  Breadcrumbs: jest.fn(({ items }) => (
    <div data-testid="mock-Breadcrumbs" data-item-count={items?.length}>
      Mock Breadcrumbs
    </div>
  )),
}));

jest.mock("../../../../components/sellShareActions/sellShareActions", () => ({
  SellShareActions: jest.fn(({ more_actions }) => (
    <div data-testid="mock-SellShareActions" data-action-count={more_actions?.length}>
      Mock SellShareActions
    </div>
  )),
}));

jest.mock("../../components/ProductInfoRight/ProductInfoRight", () => ({
  ProductInfoRight: jest.fn(({ product }) => (
    <div data-testid="mock-ProductInfoRight" data-product-id={product?.id}>
      Mock ProductInfoRight
    </div>
  )),
}));

// Importa los mocks para poder limpiarlos en beforeEach
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../hooks/useProductDetail";
import { ProductInfoBlock } from "../../components/ProductInfoBlock/ProductInfoBlock";
import { ProductInterestRow } from "../../../../components/ProductInterestRow/ProductInterestRow";
import { Breadcrumbs } from "../../../../components/Breadcrumbs/Breadcrumbs";
import { SellShareActions } from "../../../../components/sellShareActions/sellShareActions";
import { ProductInfoRight } from "../../components/ProductInfoRight/ProductInfoRight";

// --- FIN DE MOCKS ---

// Feature: Product Detail Page Display
describe("Feature: Product Detail Page Display", () => {
  // Datos de prueba para un objeto Product completo
  const mockProductFull: Product = {
    id: "MLA123456789",
    title: "iPhone 15 Pro Max",
    description: "El último modelo de iPhone.",
    price: 1500,
    currency: "USD",
    pictures: [{ url: "pic1.jpg" }],
    breadcrumbs: {
      items: [{ id: "cat1", name: "Celulares" }],
      more_actions: { more_actions: [{ label: "Share", url: "#" }] }, // Asegúrate de que esta estructura exista
    },
    more_actions: [], // Si existe en tu Product type
    seller_info: { name: "Apple Store", url: "#", rating: 5, nickname: "AppleOfficial", visitUs: "Visita nuestra tienda" },
    buy_and_delivery: {
      delivery: { title: "Envío", description: "Descripción", calculate_shipping: "Calcular", shipping_url: "#" },
      disponibility: { title: "Disponible" },
      actions: [{ text: "Comprar", url: "#", is_primary: true }],
      benefits: null
    },
    interest: { title: "También te puede interesar", items: [{ id: "item1", title: "Accesorio" }] }, // Asegúrate de que esta estructura exista
    condition: "new",
    sold_quantity: 100,
    badge_info: null,
    rating: { average: 4.5, total_reviews: 100 },
    purchase: { amount: 100, currency: "USD", decimals: 2, original_amount: null, installments: null, discount_percentage: null, promotion: null },
    color_selector: null,
    keyInfo: null,
  };

  // Datos de prueba para un objeto Product mínimo (sin secciones opcionales)
  const mockProductMinimal: Product = {
    ...mockProductFull, // Copia las propiedades obligatorias
    breadcrumbs: {
      items: [], // Vacío
      more_actions: { more_actions: [] }, // Vacío
    },
    interest: undefined, // No interest section
  };

  beforeEach(() => {
    // Limpia las llamadas a todos los mocks antes de cada test
    (useParams as jest.Mock).mockClear();
    (useProductDetails as jest.Mock).mockClear();
    (ProductInfoBlock as jest.Mock).mockClear();
    (ProductInterestRow as jest.Mock).mockClear();
    (Breadcrumbs as jest.Mock).mockClear();
    (SellShareActions as jest.Mock).mockClear();
    (ProductInfoRight as jest.Mock).mockClear();

    // Por defecto, mockeamos useParams para devolver un ID
    (useParams as jest.Mock).mockReturnValue({ id: "test-product-id" });
  });

  // Scenario: Displaying loading state
  describe("Scenario: Displaying loading state", () => {
    // Given: useProductDetails indicates loading: true
    beforeEach(() => {
      (useProductDetails as jest.Mock).mockReturnValue({
        product: null,
        loading: true,
        error: null,
      });
      // When: The ProductDetailPage component is rendered
      render(<ProductDetailPage />);
    });

    it("Then: it should display the 'Cargando Producto...' message", () => {
      expect(screen.getByText("Cargando Producto...")).toBeInTheDocument();
    });

    it("And: it should NOT display any other product content", () => {
      expect(screen.queryByTestId("product-detail-page")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-ProductInfoBlock")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-ProductInterestRow")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-Breadcrumbs")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-SellShareActions")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-ProductInfoRight")).not.toBeInTheDocument();
      expect(screen.queryByText("Error al cargar el producto:")).not.toBeInTheDocument();
      expect(screen.queryByText("Producto no encontrado.")).not.toBeInTheDocument();
    });
  });

  // Scenario: Displaying error message
  describe("Scenario: Displaying error message", () => {
    const errorMessage = "Algo salió mal.";
    // Given: useProductDetails indicates error: "some error message"
    beforeEach(() => {
      (useProductDetails as jest.Mock).mockReturnValue({
        product: null,
        loading: false,
        error: errorMessage,
      });
      // When: The component is rendered
      render(<ProductDetailPage />);
    });

    it("Then: it should display the error message", () => {
      expect(screen.getByText(`Error al cargar el producto: ${errorMessage}`)).toBeInTheDocument();
    });

    it("And: it should NOT display any other product content", () => {
      expect(screen.queryByTestId("product-detail-page")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-ProductInfoBlock")).not.toBeInTheDocument();
      expect(screen.queryByText("Cargando Producto...")).not.toBeInTheDocument();
      expect(screen.queryByText("Producto no encontrado.")).not.toBeInTheDocument();
    });
  });

  // Scenario: Displaying "Product not found"
  describe("Scenario: Displaying 'Product not found'", () => {
    // Given: useProductDetails returns product: null
    beforeEach(() => {
      (useProductDetails as jest.Mock).mockReturnValue({
        product: null,
        loading: false,
        error: null,
      });
      // When: The component is rendered
      render(<ProductDetailPage />);
    });

    it("Then: it should display the 'Producto no encontrado.' message", () => {
      expect(screen.getByText("Producto no encontrado.")).toBeInTheDocument();
    });

    it("And: it should NOT display any other product content", () => {
      expect(screen.queryByTestId("product-detail-page")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mock-ProductInfoBlock")).not.toBeInTheDocument();
      expect(screen.queryByText("Cargando Producto...")).not.toBeInTheDocument();
      expect(screen.queryByText("Error al cargar el producto:")).not.toBeInTheDocument();
    });
  });

  // Scenario: Displaying full product details
  describe("Scenario: Displaying full product details", () => {
    // Given: useProductDetails returns a mockProductFull
    beforeEach(() => {
      (useProductDetails as jest.Mock).mockReturnValue({
        product: mockProductFull,
        loading: false,
        error: null,
      });
      // When: The component is rendered
      render(<ProductDetailPage />);
    });

    it("Then: the main product detail page container should be present", () => {
      // We find data-testid="product-detail-page" al div principal en ProductDetailPage.tsx
      expect(screen.getByTestId("product-detail-page")).toBeInTheDocument();
      expect(screen.getByTestId("product-detail-page")).toHaveClass("product-detail-page");
    });

    it("And: ProductInterestRow should be rendered with correct props", () => {
      expect(ProductInterestRow).toHaveBeenCalledWith(
        expect.objectContaining({
          title: mockProductFull.interest?.title,
          items: mockProductFull.interest?.items,
        }),
        undefined // Segundo argumento para mocks de componentes funcionales
      );
      expect(screen.getByTestId("mock-ProductInterestRow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-ProductInterestRow")).toHaveAttribute("data-title", mockProductFull.interest?.title);
      expect(screen.getByTestId("mock-ProductInterestRow")).toHaveAttribute("data-item-count", String(mockProductFull.interest?.items?.length));
    });

    it("And: Breadcrumbs should be rendered with correct props", () => {
      expect(Breadcrumbs).toHaveBeenCalledWith(
        expect.objectContaining({
          items: mockProductFull.breadcrumbs?.items,
        }),
        undefined
      );
      expect(screen.getByTestId("mock-Breadcrumbs")).toBeInTheDocument();
      expect(screen.getByTestId("mock-Breadcrumbs")).toHaveAttribute("data-item-count", String(mockProductFull.breadcrumbs?.items?.length));
    });

    it("And: SellShareActions should be rendered with correct props", () => {
      expect(SellShareActions).toHaveBeenCalledWith(
        expect.objectContaining({
          more_actions: mockProductFull.breadcrumbs?.more_actions?.more_actions,
        }),
        undefined
      );
      expect(screen.getByTestId("mock-SellShareActions")).toBeInTheDocument();
      expect(screen.getByTestId("mock-SellShareActions")).toHaveAttribute("data-action-count", String(mockProductFull.breadcrumbs?.more_actions?.more_actions?.length));
    });

    it("And: ProductInfoBlock should be rendered with correct product prop", () => {
      expect(ProductInfoBlock).toHaveBeenCalledWith(
        expect.objectContaining({
          product: mockProductFull,
        }),
        undefined
      );
      expect(screen.getByTestId("mock-ProductInfoBlock")).toBeInTheDocument();
      expect(screen.getByTestId("mock-ProductInfoBlock")).toHaveAttribute("data-product-id", mockProductFull.id);
    });

    it("And: ProductInfoRight should be rendered with correct product prop", () => {
      expect(ProductInfoRight).toHaveBeenCalledWith(
        expect.objectContaining({
          product: mockProductFull,
        }),
        undefined
      );
      expect(screen.getByTestId("mock-ProductInfoRight")).toBeInTheDocument();
      expect(screen.getByTestId("mock-ProductInfoRight")).toHaveAttribute("data-product-id", mockProductFull.id);
    });

    it("And: no loading, error, or not found messages should be displayed", () => {
      expect(screen.queryByText("Cargando Producto...")).not.toBeInTheDocument();
      expect(screen.queryByText("Error al cargar el producto:")).not.toBeInTheDocument();
      expect(screen.queryByText("Producto no encontrado.")).not.toBeInTheDocument();
    });
  });

  // Scenario: Displaying minimal product details (conditional rendering checks)
  describe("Scenario: Displaying minimal product details", () => {
    // Given: useProductDetails returns a mockProductMinimal
    beforeEach(() => {
      (useProductDetails as jest.Mock).mockReturnValue({
        product: mockProductMinimal,
        loading: false,
        error: null,
      });
      // When: The component is rendered
      render(<ProductDetailPage />);
    });

    it("Then: the main product detail page container should be present", () => {
      expect(screen.getByTestId("product-detail-page")).toBeInTheDocument();
    });

    it("And: ProductInterestRow should NOT be rendered", () => {
      expect(screen.queryByTestId("mock-ProductInterestRow")).not.toBeInTheDocument();
    });

    it("And: Breadcrumbs should NOT be rendered", () => {
      expect(screen.queryByTestId("mock-Breadcrumbs")).not.toBeInTheDocument();
    });

    it("And: SellShareActions should NOT be rendered", () => {
      expect(screen.queryByTestId("mock-SellShareActions")).not.toBeInTheDocument();
    });

    it("And: ProductInfoBlock should still be rendered with correct product prop", () => {
      expect(ProductInfoBlock).toHaveBeenCalledWith(
        expect.objectContaining({
          product: mockProductMinimal,
        }),
        undefined
      );
      expect(screen.getByTestId("mock-ProductInfoBlock")).toBeInTheDocument();
    });

    it("And: ProductInfoRight should still be rendered with correct product prop", () => {
      expect(ProductInfoRight).toHaveBeenCalledWith(
        expect.objectContaining({
          product: mockProductMinimal,
        }),
        undefined
      );
      expect(screen.getByTestId("mock-ProductInfoRight")).toBeInTheDocument();
    });
  });
});