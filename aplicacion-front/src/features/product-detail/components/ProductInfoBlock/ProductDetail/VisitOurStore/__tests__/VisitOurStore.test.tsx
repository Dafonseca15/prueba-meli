import { render, screen } from '@testing-library/react';
import { VisitOurStore } from '../VisitOurStore';
import type { sellerInfoProps } from '../../../../../types/product';

// --- MOCKS DE COMPONENTES HIJOS ---

// Mock para CustomLink
// Asegúrate de que la ruta sea correcta desde este archivo de test
jest.mock("../../../../../../../components/CustomLink/CustomLink", () => ({
  CustomLink: jest.fn(({ children, href, size, className }) => (
    <a
      data-testid="mock-CustomLink"
      data-href={href}
      data-size={size}
      data-class-name={className}
      href={href} // Para que el href sea inspeccionable en el DOM
    >
      {children}
    </a>
  )),
}));

// --- FIN DE MOCKS ---

// Feature: Displaying Seller Store Visit Information
describe("Feature: Displaying Seller Store Visit Information", () => {
  // Datos de prueba para seller_info
  const mockSellerInfo: sellerInfoProps['seller_info'] = {
    name: "Tienda Oficial de Prueba",
    url: "/tienda/oficial",
    rating: 4.5,
    visitUs: "Visita nuestra tienda oficial", // Propiedad usada en el componente
  };

  // Scenario: Component renders with valid seller information
  describe("Scenario: Component renders with valid seller information", () => {
    // Given: A VisitOurStore component with seller_info containing visitUs data
    const componentProps = { seller_info: mockSellerInfo };

    beforeEach(() => {
      // When: The component is rendered
      render(<VisitOurStore {...componentProps} />);
    });

    it("Then: the main container div should be present", () => {
      // Necesitas añadir data-testid="visit-our-store" al div principal en VisitOurStore.tsx
      expect(screen.getByTestId("visit-our-store")).toBeInTheDocument();
      expect(screen.getByTestId("visit-our-store")).toHaveClass("visit-our-store");
    });

    it("And: the mocked CustomLink should be rendered with correct props", () => {
      const customLinkElement = screen.getByTestId("mock-CustomLink");
      expect(customLinkElement).toBeInTheDocument();
      expect(customLinkElement).toHaveAttribute("data-href", "#"); // href es fijo a "#" en el componente
      expect(customLinkElement).toHaveAttribute("data-size", "xs");
      expect(customLinkElement).toHaveAttribute("data-class-name", "visit-our-store__link");
    });

    it("And: the CustomLink should contain the logo image with correct src and alt", () => {
      const customLinkElement = screen.getByTestId("mock-CustomLink");
      const imgElement = customLinkElement.querySelector("img"); // Busca la img dentro del mock link

      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute("src", "https://http2.mlstatic.com/D_NQ_NP_865786-MLA83101123836_032025-G.jpg");
      expect(imgElement).toHaveAttribute("alt", ""); // El alt está vacío en el componente
      expect(imgElement).toHaveClass("logo");
    });

    it("And: the CustomLink should contain the seller_info.visitUs text", () => {
      const customLinkElement = screen.getByTestId("mock-CustomLink");
      expect(customLinkElement).toHaveTextContent(mockSellerInfo.visitUs);
    });

    it("And: the verified span should be present inside the CustomLink", () => {
      const customLinkElement = screen.getByTestId("mock-CustomLink");
      const verifiedSpan = customLinkElement.querySelector(".visit-our-store__link__verified");
      expect(verifiedSpan).toBeInTheDocument();
      expect(verifiedSpan).toHaveClass("visit-our-store__link__verified");
    });
  });
});