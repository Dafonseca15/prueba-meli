// src/features/product-detail/components/ProductInfoBlock/ProductDetail/__tests__/ProductDetail.test.tsx

import React from 'react'; // ¡Importante: asegúrate de que sea 'import React from "react";' en tu componente ProductDetail.tsx también!
import { render, screen } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail'; // La ruta es correcta desde __tests__
import type { Product } from '../../../../types/product'; // La ruta a tu tipo Product

// --- MOCKS PARA LOS COMPONENTES HIJOS ---
// Estos mocks ahora capturan y exponen las props para que podamos verificarlas
jest.mock("../VisitOurStore/VisitOurStore", () => ({
  VisitOurStore: jest.fn(({ seller_info }) => (
    <div data-testid="mock-VisitOurStore" data-seller-name={seller_info?.name} />
  )),
}));

jest.mock("../FavoriteSection/FavoriteSection", () => ({
  FavoriteSection: jest.fn(({ condition, sold_quantity }) => (
    <div data-testid="mock-FavoriteSection" data-condition={condition} data-sold-quantity={sold_quantity} />
  )),
}));

jest.mock("../BadgeCategory/BadgeCategory", () => ({
  BadgeCategory: jest.fn(({ badge_info }) => (
    <div data-testid="mock-BadgeCategory" data-badge-text={badge_info?.text} data-category-url={badge_info?.category_url} />
  )),
}));

jest.mock("../../../../../../components/CustomTitle/CustomTitle", () => ({
  CustomTitle: jest.fn(({ children, level, size, bold, marginBottom }) => (
    <h3 data-testid="mock-CustomTitle" data-level={level} data-size={size} data-bold={bold} data-margin-bottom={marginBottom}>{children}</h3>
  )),
}));

jest.mock("../../../../../../components/Rating/Rating", () => ({
  Rating: jest.fn(({ rating }) => (
    <div data-testid="mock-Rating" data-average={rating?.average} data-total-reviews={rating?.total_reviews} />
  )),
}));

jest.mock("../ProductPurchaseDetails/ProductPurchaseDetails", () => ({
  ProductPurchaseDetails: jest.fn(({ purchase }) => (
    <div data-testid="mock-ProductPurchaseDetails" data-price={purchase?.price} data-available-quantity={purchase?.available_quantity} />
  )),
}));

jest.mock("../ProductColorSelector/ProductColorSelector", () => ({
  ProductColorSelector: jest.fn(({ color_selector }) => (
    <div data-testid="mock-ProductColorSelector" data-selected-color-name={color_selector?.selected_color?.name} />
  )),
}));

jest.mock("../ProductInfoKey/ProductInfoKey", () => ({
  ProductInfoKey: jest.fn(({ keyInfo }) => (
    <div data-testid="mock-ProductInfoKey" data-key-info-length={keyInfo?.length} />
  )),
}));
// --- FIN DE MOCKS ---

describe("ProductDetail Component (BDD Style)", () => {

  // Objeto de producto completo para pruebas de renderizado
  const mockProductFull: Product = {
    id: "MLA123456789",
    title: "iPhone 15 Pro Max 256 GB Nuevo",
    description: "El último modelo de iPhone con todas las características.",
    price: 1500,
    currency: "USD",
    pictures: [{ url: "http://example.com/pic1.jpg" }],
    breadcrumbs: [{ id: "cat1", name: "Celulares" }],
    more_actions: [{ label: "Comparar", url: "/compare" }],
    seller_info: { name: "Apple Store Oficial", url: "http://example.com/store", rating: 4.9 },
    condition: "new",
    sold_quantity: 1250,
    badge_info: { text: "MercadoLíder Platinum", category_url: "/ml", category_position: "top", category_text: "Vendedor" },
    rating: { average: 4.8, total_reviews: 2345 },
    purchase: { price: 1500, available_quantity: 10, installments_text: "12 cuotas sin interés", shipping_cost_text: "Envío gratis" },
    color_selector: {
      available_colors: [
        { name: "Titanio Natural", hex: "#E5DCCF" },
        { name: "Titanio Azul", hex: "#3A465B" }
      ],
      selected_color: { name: "Titanio Natural", hex: "#E5DCCF" }
    },
    keyInfo: [
      { label: "Memoria RAM", value: "8 GB" },
      { label: "Almacenamiento", value: "256 GB" },
      { label: "Procesador", value: "A17 Bionic" }
    ]
  };

  // Objeto de producto mínimo para pruebas de renderizado condicional
  const mockProductMinimal: Product = {
    id: "MLA987654321",
    title: "Producto Básico", // Título y rating suelen ser obligatorios en muchos diseños
    description: "",
    price: 0,
    currency: "",
    pictures: [],
    breadcrumbs: [],
    more_actions: [],
    rating: { average: 0, total_reviews: 0 },
    // El resto de las propiedades son opcionales y se omiten para el caso mínimo
  };

  describe("Given a ProductDetail component", () => {

    describe("When it is rendered with a full product object", () => {
      beforeEach(() => {
        render(<ProductDetail product={mockProductFull} />);
      });

      // Then: Debe renderizar el contenedor principal
      it("Then it should render the main container div", () => {
        const mainContainer = screen.getByTestId("product-info"); // O si no tiene data-testid, busca por clase o rol
        expect(mainContainer).toBeInTheDocument();
        expect(mainContainer).toHaveClass("product-info");
      });

      // Then: Debe renderizar VisitOurStore con props correctas
      it("Then it should render VisitOurStore with correct props", () => {
        const visitStoreMock = screen.getByTestId("mock-VisitOurStore");
        expect(visitStoreMock).toBeInTheDocument();
        expect(visitStoreMock).toHaveAttribute("data-seller-name", mockProductFull.seller_info?.name);
      });

      // Then: Debe renderizar FavoriteSection con props correctas
      it("Then it should render FavoriteSection with correct props", () => {
        const favSectionMock = screen.getByTestId("mock-FavoriteSection");
        expect(favSectionMock).toBeInTheDocument();
        expect(favSectionMock).toHaveAttribute("data-condition", mockProductFull.condition);
        expect(favSectionMock).toHaveAttribute("data-sold-quantity", String(mockProductFull.sold_quantity));
      });

      // Then: Debe renderizar BadgeCategory con props correctas
      it("Then it should render BadgeCategory with correct props", () => {
        const badgeCategoryMock = screen.getByTestId("mock-BadgeCategory");
        expect(badgeCategoryMock).toBeInTheDocument();
        expect(badgeCategoryMock).toHaveAttribute("data-badge-text", mockProductFull.badge_info?.text);
        expect(badgeCategoryMock).toHaveAttribute("data-category-url", mockProductFull.badge_info?.category_url);
      });

      // Then: Debe renderizar CustomTitle con props correctas y texto
      it("Then it should render CustomTitle with correct props and text", () => {
        const customTitleMock = screen.getByTestId("mock-CustomTitle");
        expect(customTitleMock).toBeInTheDocument();
        expect(customTitleMock).toHaveTextContent(mockProductFull.title);
        expect(customTitleMock).toHaveAttribute("data-level", "h3");
        expect(customTitleMock).toHaveAttribute("data-size", "2xl");
        expect(customTitleMock).toHaveAttribute("data-bold", "bold");
        expect(customTitleMock).toHaveAttribute("data-margin-bottom", "0.5rem");
      });

      // Then: Debe renderizar Rating con props correctas
      it("Then it should render Rating with correct props", () => {
        const ratingMock = screen.getByTestId("mock-Rating");
        expect(ratingMock).toBeInTheDocument();
        expect(ratingMock).toHaveAttribute("data-average", String(mockProductFull.rating?.average));
        expect(ratingMock).toHaveAttribute("data-total-reviews", String(mockProductFull.rating?.total_reviews));
      });

      // Then: Debe renderizar ProductPurchaseDetails con props correctas
      it("Then it should render ProductPurchaseDetails with correct props", () => {
        const purchaseDetailsMock = screen.getByTestId("mock-ProductPurchaseDetails");
        expect(purchaseDetailsMock).toBeInTheDocument();
        expect(purchaseDetailsMock).toHaveAttribute("data-price", String(mockProductFull.purchase?.price));
        expect(purchaseDetailsMock).toHaveAttribute("data-available-quantity", String(mockProductFull.purchase?.available_quantity));
      });

      // Then: Debe renderizar ProductColorSelector con props correctas
      it("Then it should render ProductColorSelector with correct props", () => {
        const colorSelectorMock = screen.getByTestId("mock-ProductColorSelector");
        expect(colorSelectorMock).toBeInTheDocument();
        expect(colorSelectorMock).toHaveAttribute("data-selected-color-name", mockProductFull.color_selector?.selected_color?.name);
      });

      // Then: Debe renderizar ProductInfoKey con props correctas
      it("Then it should render ProductInfoKey with correct props", () => {
        const infoKeyMock = screen.getByTestId("mock-ProductInfoKey");
        expect(infoKeyMock).toBeInTheDocument();
        // Verifica la longitud del array keyInfo
        expect(infoKeyMock).toHaveAttribute("data-key-info-length", String(mockProductFull.keyInfo?.length));
      });
    });

    describe("When it is rendered with a minimal product object (no optional data)", () => {
      beforeEach(() => {
        render(<ProductDetail product={mockProductMinimal} />);
      });

      // Then: No debe renderizar VisitOurStore
      it("Then it should NOT render VisitOurStore", () => {
        expect(screen.queryByTestId("mock-VisitOurStore")).not.toBeInTheDocument();
      });

      // Then: No debe renderizar FavoriteSection
      it("Then it should NOT render FavoriteSection", () => {
        expect(screen.queryByTestId("mock-FavoriteSection")).not.toBeInTheDocument();
      });

      // Then: No debe renderizar BadgeCategory
      it("Then it should NOT render BadgeCategory", () => {
        expect(screen.queryByTestId("mock-BadgeCategory")).not.toBeInTheDocument();
      });

      // Then: Debe renderizar CustomTitle (ya que el título es obligatorio)
      it("Then it should render CustomTitle", () => {
        const customTitleMock = screen.getByTestId("mock-CustomTitle");
        expect(customTitleMock).toBeInTheDocument();
        expect(customTitleMock).toHaveTextContent(mockProductMinimal.title);
      });

      // Then: Debe renderizar Rating (ya que el rating es obligatorio)
      it("Then it should render Rating", () => {
        const ratingMock = screen.getByTestId("mock-Rating");
        expect(ratingMock).toBeInTheDocument();
      });

      // Then: No debe renderizar ProductPurchaseDetails
      it("Then it should NOT render ProductPurchaseDetails", () => {
        expect(screen.queryByTestId("mock-ProductPurchaseDetails")).not.toBeInTheDocument();
      });

      // Then: No debe renderizar ProductColorSelector
      it("Then it should NOT render ProductColorSelector", () => {
        expect(screen.queryByTestId("mock-ProductColorSelector")).not.toBeInTheDocument();
      });

      // Then: No debe renderizar ProductInfoKey
      it("Then it should NOT render ProductInfoKey", () => {
        expect(screen.queryByTestId("mock-ProductInfoKey")).not.toBeInTheDocument();
      });
    });
  });
});