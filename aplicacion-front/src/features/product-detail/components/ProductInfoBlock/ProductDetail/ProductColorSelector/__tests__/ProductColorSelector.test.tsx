import { render, screen, fireEvent } from '@testing-library/react';
import { ProductColorSelector } from '../ProductColorSelector'; // Ruta a tu componente
import type { ColorsSelectorProps } from '../../../../../types/product'; // Asegúrate de la ruta a tus tipos

// --- MOCKS DE COMPONENTES HIJOS Y HOOKS ---
interface ColorOption {
    name: string;
    hex: string;
    thumbnailUrl: string;
    selected: boolean;
  }

import { CustomText } from "../../../../../../../components/CustomText/CustomText";

// Mock para CustomText
jest.mock("../../../../../../../components/CustomText/CustomText", () => ({
  CustomText: jest.fn(({ children, as, size, color, className }) => (
    <span
      data-testid="mock-CustomText"
      data-as={as || 'span'} // CustomText puede tener 'as' prop
      data-size={size}
      data-color={color}
      data-class-name={className}
    >
      {children}
    </span>
  )),
}));

// Mock para useNavigate de react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  // Mantén el resto de las exportaciones de react-router-dom si las usas en otros tests
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// --- FIN DE MOCKS ---

describe("ProductColorSelector Component", () => {
  // Datos de prueba para el color_selector
  const mockColorSelector: ColorOption[] = [
    { name: "Negro Espacial", hex: "#000000", thumbnailUrl: "/thumb/negro.jpg", selected: false },
    { name: "Blanco Estelar", hex: "#FFFFFF", thumbnailUrl: "/thumb/blanco.jpg", selected: true }, // Este está seleccionado inicialmente
    { name: "Azul Medianoche", hex: "#000080", thumbnailUrl: "/thumb/azul.jpg", selected: false },
  ];

  const props: ColorsSelectorProps = {
    color_selector: mockColorSelector,
  };

  beforeEach(() => {
    // Limpia las llamadas a los mocks antes de cada test
    mockNavigate.mockClear();
    (CustomText as jest.Mock).mockClear();
  });

  // --- TESTS DE RENDERIZADO INICIAL ---
  describe("When rendered initially", () => {
    it("Then it should display 'Color:' and the name of the initially selected color", () => {
      render(<ProductColorSelector {...props} />);

      // Verifica que CustomText se renderiza con el texto esperado
      const customTextElement = screen.getByTestId("mock-CustomText");
      expect(customTextElement).toBeInTheDocument();
      // El texto dentro de CustomText incluye el span con el nombre del color
      expect(customTextElement).toHaveTextContent("Color: Blanco Estelar");

      // Verifica las props de CustomText
      expect(customTextElement).toHaveAttribute("data-as", "span");
      expect(customTextElement).toHaveAttribute("data-size", "sm");
      expect(customTextElement).toHaveAttribute("data-color", "#0000008c");
      expect(customTextElement).toHaveAttribute("data-class-name", "product-color-selector__label");
    });

    it("Then it should render all color option buttons with correct attributes", () => {
      render(<ProductColorSelector {...props} />);

      // Obtener todos los botones de opciones de color
      const colorOptionButtons = screen.getAllByRole("button", { name: /seleccionar color/i });
      expect(colorOptionButtons).toHaveLength(mockColorSelector.length);

      mockColorSelector.forEach((option) => {
        const button = screen.getByRole("button", { name: `Seleccionar color ${option.name}` });
        expect(button).toBeInTheDocument();

        // Verificar la imagen dentro del botón
        const img = screen.getByAltText(option.name);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", option.thumbnailUrl);
      });
    });

    it("Then the initially selected color option should have the --selected class", () => {
      render(<ProductColorSelector {...props} />);

      const selectedOptionButton = screen.getByRole("button", { name: `Seleccionar color Blanco Estelar` });
      expect(selectedOptionButton).toHaveClass("product-color-selector__thumbnail--selected");

      // Asegurarse de que las otras no la tengan
      const nonSelectedOptionButton = screen.getByRole("button", { name: `Seleccionar color Negro Espacial` });
      expect(nonSelectedOptionButton).not.toHaveClass("product-color-selector__thumbnail--selected");
    });

    it("Then it should initialize nameColor to 'Selecciona un color' if no option is selected", () => {
        const noSelectedProps: ColorsSelectorProps = {
            color_selector: [
                { name: "Rojo", hex: "#FF0000", thumbnailUrl: "/thumb/rojo.jpg", selected: false },
                { name: "Verde", hex: "#00FF00", thumbnailUrl: "/thumb/verde.jpg", selected: false },
            ]
        };
        render(<ProductColorSelector {...noSelectedProps} />);
        const customTextElement = screen.getByTestId("mock-CustomText");
        expect(customTextElement).toHaveTextContent("Color: Selecciona un color");
    });
  });

  // --- TESTS DE INTERACCIÓN ---
  describe("When interacting with color options", () => {
    it("Then the displayed color name should change on mouse enter", () => {
      render(<ProductColorSelector {...props} />);

      const customTextElement = screen.getByTestId("mock-CustomText");
      expect(customTextElement).toHaveTextContent("Color: Blanco Estelar"); // Estado inicial

      // Simular mouse enter en la opción "Negro Espacial"
      const negroEspacialButton = screen.getByRole("button", { name: `Seleccionar color Negro Espacial` });
      fireEvent.mouseEnter(negroEspacialButton);

      // Verificar que el nombre del color en el CustomText ha cambiado
      expect(customTextElement).toHaveTextContent("Color: Negro Espacial");

      // Simular mouse enter en la opción "Azul Medianoche"
      const azulMedianocheButton = screen.getByRole("button", { name: `Seleccionar color Azul Medianoche` });
      fireEvent.mouseEnter(azulMedianocheButton);
      expect(customTextElement).toHaveTextContent("Color: Azul Medianoche");
    });

    it("Then clicking a color option should navigate to the correct product URL", () => {
      render(<ProductColorSelector {...props} />);

      // Simular clic en la opción "Negro Espacial"
      const negroEspacialButton = screen.getByRole("button", { name: `Seleccionar color Negro Espacial` });
      fireEvent.click(negroEspacialButton);

      // Verificar que navigate fue llamado con la URL correcta
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/thumb/negro.jpg");

      // Simular clic en la opción "Blanco Estelar"
      const blancoEstelarButton = screen.getByRole("button", { name: `Seleccionar color Blanco Estelar` });
      fireEvent.click(blancoEstelarButton);

      expect(mockNavigate).toHaveBeenCalledTimes(2); // Se llamó otra vez
      expect(mockNavigate).toHaveBeenCalledWith("/thumb/blanco.jpg");
    });
  });
});