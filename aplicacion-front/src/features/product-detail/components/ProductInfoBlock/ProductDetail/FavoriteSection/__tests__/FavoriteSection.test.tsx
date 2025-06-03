import { render, screen } from '@testing-library/react';
import { FavoriteSection } from '../FavoriteSection'; // La ruta a tu componente FavoriteSection
import type { FavoriteSectionProps } from '../../../../../types/product'; // La ruta a tu tipo FavoriteSectionProps

// --- MOCK DE COMPONENTES HIJOS ---
// Mock de CustomText para aislar FavoriteSection y verificar las props que recibe.
jest.mock("../../../../../../../components/CustomText/CustomText", () => ({
  CustomText: jest.fn(({ children, size, color, className }) => (
    <span
      data-testid="mock-CustomText"
      data-size={size}
      data-color={color}
      data-class-name={className}
    >
      {children}
    </span>
  )),
}));
// --- FIN DE MOCKS ---

describe("FavoriteSection Component", () => {
  // Define un conjunto de props para usar en los tests
  const defaultProps: FavoriteSectionProps = {
    condition: "new",
    sold_quantity: 123
  };

  const highSoldQuantityProps: FavoriteSectionProps = {
    condition: "used",
    sold_quantity: 2578
  };

  const lowSoldQuantityProps: FavoriteSectionProps = {
    condition: "refurbished",
    sold_quantity: 5
  };

  describe("When FavoriteSection is rendered with default props", () => {
    beforeEach(() => {
      render(<FavoriteSection {...defaultProps} />);
    });

    it("Then it should render the main container", () => {
      expect(screen.getByTestId("favorite-section-container")).toBeInTheDocument();
      expect(screen.getByTestId("favorite-section-container")).toHaveClass("favorite-section-container");
    });

    it("Then it should render the status and favorites sub-container", () => {
      expect(screen.getByTestId("favorite-section-container__status-and-favorites")).toBeInTheDocument();
      expect(screen.getByTestId("favorite-section-container__status-and-favorites")).toHaveClass("favorite-section-container__status-and-favorites");
    });

    it("Then it should render the CustomText component with correct props and content", () => {
      // El CustomText está mockeado como un <span> con data-testid="mock-CustomText"
      const customTextElement = screen.getByTestId("mock-CustomText");

      expect(customTextElement).toBeInTheDocument();
      expect(customTextElement).toHaveAttribute("data-size", "xs");
      expect(customTextElement).toHaveAttribute("data-color", "#0000008c");
      expect(customTextElement).toHaveAttribute("data-class-name", "favorite-section-container__condition");

      // Verifica el texto formateado
      expect(customTextElement).toHaveTextContent(`${defaultProps.condition} | 100 vendidos`);
    });

    it("Then it should render the like button with the correct aria-label", () => {
      const likeButton = screen.getByRole("button", { name: /añadir a favoritos/i });
      expect(likeButton).toBeInTheDocument();
      expect(likeButton).toHaveClass("favorite-section-container__like-button");
      expect(likeButton).toHaveAttribute("aria-label", "Añadir a favoritos");
    });

    it("Then it should render the like icon span", () => {
      // Puedes buscar el span dentro del botón o por su clase si es único
      const likeIcon = screen.getByRole("button", { name: /añadir a favoritos/i }).querySelector(".favorite-section-container__like-icon");
      expect(likeIcon).toBeInTheDocument();
      expect(likeIcon).toHaveClass("favorite-section-container__like-icon");
    });
  });

  describe("When FavoriteSection is rendered with different sold_quantity values", () => {
    it("Then it should correctly format sold_quantity for high values", () => {
      render(<FavoriteSection {...highSoldQuantityProps} />);
      const customTextElement = screen.getByTestId("mock-CustomText");
      // 2578 / 100 = 25.78, Math.floor(25.78) * 100 = 2500
      expect(customTextElement).toHaveTextContent(`${highSoldQuantityProps.condition} | 2500 vendidos`);
    });

    it("Then it should correctly format sold_quantity for low values (below 100)", () => {
      render(<FavoriteSection {...lowSoldQuantityProps} />);
      const customTextElement = screen.getByTestId("mock-CustomText");
      // 5 / 100 = 0.05, Math.floor(0.05) * 100 = 0
      expect(customTextElement).toHaveTextContent(`${lowSoldQuantityProps.condition} | 0 vendidos`);
    });
  });
});