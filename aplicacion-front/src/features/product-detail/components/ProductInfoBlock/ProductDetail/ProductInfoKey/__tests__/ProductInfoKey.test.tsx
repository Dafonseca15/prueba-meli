import { render, screen } from '@testing-library/react';
import { ProductInfoKey } from '../ProductInfoKey'; // Ruta a tu componente
import type { keyInfoProps } from '../../../../../types/product'; // Asegúrate de la ruta a tu tipo
import { CustomText } from "../../../../../../../components/CustomText/CustomText"
import { CustomLink } from "../../../../../../../components/CustomLink/CustomLink";

// --- MOCKS DE COMPONENTES HIJOS ---

// Mock para CustomText (asegúrate de que la ruta sea correcta)
jest.mock("../../../../../../../components/CustomText/CustomText", () => ({
  CustomText: jest.fn(({ children, as, size, bold, color }) => (
    <span
      data-testid="mock-CustomText"
      data-as={as || 'span'}
      data-size={size}
      data-bold={bold}
      data-color={color}
    >
      {children}
    </span>
  )),
}));

// Mock para CustomLink (asegúrate de que la ruta sea correcta)
jest.mock("../../../../../../../components/CustomLink/CustomLink", () => ({
  CustomLink: jest.fn(({ children, href, size }) => (
    <a
      data-testid="mock-CustomLink"
      data-href={href}
      data-size={size}
      href={href} // Realmente en el mock, pero útil para inspección
    >
      {children}
    </a>
  )),
}));

// --- FIN DE MOCKS ---

describe("ProductInfoKey Component", () => {
  // Datos de prueba para el escenario con 3 ítems o menos
  const mockKeyInfoShort: keyInfoProps['keyInfo'] = {
    title: "Características principales",
    items: [
      "Item 1: Detalle importante",
      "Item 2: Otra especificación",
      "Item 3: Último detalle relevante",
    ],
  };

  // Datos de prueba para el escenario con más de 3 ítems
  const mockKeyInfoLong: keyInfoProps['keyInfo'] = {
    title: "Especificaciones técnicas",
    items: [
      "RAM: 16 GB DDR4",
      "Almacenamiento: 512 GB SSD",
      "Procesador: Intel Core i7",
      "Gráficos: NVIDIA RTX 3060",
      "Pantalla: 15.6 pulgadas Full HD",
    ],
  };

  beforeEach(() => {
    // Limpia las llamadas a los mocks de los componentes
    (CustomText as jest.Mock).mockClear();
    (CustomLink as jest.Mock).mockClear();
  });

  // --- ESCENARIO 1: Pocos ítems (3 o menos) ---
  describe("When rendered with 3 or fewer items", () => {
    beforeEach(() => {
      render(<ProductInfoKey keyInfo={mockKeyInfoShort} />);
    });

    it("Then it should render the main container", () => {
      // Necesitas añadir data-testid="product-info-key" al div principal en ProductInfoKey.tsx
      expect(screen.getByTestId("product-info-key")).toBeInTheDocument();
      expect(screen.getByTestId("product-info-key")).toHaveClass("product-info-key");
    });

    it("Then it should render CustomText with the correct title and props", () => {
      const customTextElement = screen.getByTestId("mock-CustomText");
      expect(customTextElement).toBeInTheDocument();
      expect(customTextElement).toHaveTextContent(mockKeyInfoShort.title);
      expect(customTextElement).toHaveAttribute("data-as", "span");
      expect(customTextElement).toHaveAttribute("data-size", "sm");
      expect(customTextElement).toHaveAttribute("data-bold", "true");
      expect(customTextElement).toHaveAttribute("data-color", "#343434");
    });

    it("Then it should render a list with all items (since length <= 3)", () => {
      const listElement = screen.getByTestId("product-info-key__list"); // Necesitas data-testid en el ul
      expect(listElement).toBeInTheDocument();
      expect(listElement).toHaveClass("product-info-key__list");

      const listItems = screen.getAllByTestId("product-info-key__item"); // Necesitas data-testid en los li
      expect(listItems).toHaveLength(mockKeyInfoShort.items.length); // Espera 3 ítems

      mockKeyInfoShort.items.forEach((item, index) => {
        expect(listItems[index]).toHaveTextContent(item);
        expect(listItems[index]).toHaveClass("product-info-key__item");
      });
    });

    it("Then it should NOT render the 'Ver características' CustomLink", () => {
      const customLinkElement = screen.queryByTestId("mock-CustomLink");
      expect(customLinkElement).not.toBeInTheDocument();
    });
  });

  // --- ESCENARIO 2: Muchos ítems (más de 3) ---
  describe("When rendered with more than 3 items", () => {
    beforeEach(() => {
      render(<ProductInfoKey keyInfo={mockKeyInfoLong} />);
    });

    it("Then it should render CustomText with the correct title", () => {
      const customTextElement = screen.getByTestId("mock-CustomText");
      expect(customTextElement).toBeInTheDocument();
      expect(customTextElement).toHaveTextContent(mockKeyInfoLong.title);
    });

    it("Then it should render a list with ONLY the first 3 items", () => {
      const listElement = screen.getByTestId("product-info-key__list");
      expect(listElement).toBeInTheDocument();

      const listItems = screen.getAllByTestId("product-info-key__item");
      expect(listItems).toHaveLength(3); // ¡Importante! Solo 3 ítems deben renderizarse

      // Verifica el contenido de los 3 primeros ítems
      expect(listItems[0]).toHaveTextContent(mockKeyInfoLong.items[0]);
      expect(listItems[1]).toHaveTextContent(mockKeyInfoLong.items[1]);
      expect(listItems[2]).toHaveTextContent(mockKeyInfoLong.items[2]);

      // Asegurarse de que el cuarto item (y subsiguientes) no se renderiza
      expect(screen.queryByText(mockKeyInfoLong.items[3])).not.toBeInTheDocument();
    });

    it("Then it should render the 'Ver características' CustomLink with correct props", () => {
      const customLinkElement = screen.getByTestId("mock-CustomLink");
      expect(customLinkElement).toBeInTheDocument();
      expect(customLinkElement).toHaveTextContent("Ver características");
      expect(customLinkElement).toHaveAttribute("data-href", "#");
      expect(customLinkElement).toHaveAttribute("data-size", "xs");
      expect(customLinkElement).toHaveAttribute("href", "#"); // Si tu mock lo renderiza
    });
  });
});