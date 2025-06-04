import { render, screen, fireEvent } from '@testing-library/react';
import { ProductColorSelector } from '../ProductColorSelector';
import type { ColorsSelectorProps } from '../../../../../types/product';
import { CustomText } from '../../../../../../../components/CustomText/CustomText';

interface ColorOption {
  name: string;
  hex: string;
  thumbnailUrl: string;
  selected: boolean;
}

jest.mock('../../../../../../../components/CustomText/CustomText', () => ({
  CustomText: jest.fn(({ children, as, size, color, className }) => (
    <span
      data-testid="mock-CustomText"
      data-as={as || 'span'}
      data-size={size}
      data-color={color}
      data-class-name={className}
    >
      {children}
    </span>
  )),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ProductColorSelector Component', () => {
  const mockColorSelector: ColorOption[] = [
    { name: 'Negro Espacial', hex: '#000000', thumbnailUrl: '/thumb/negro.jpg', selected: false },
    { name: 'Blanco Estelar', hex: '#FFFFFF', thumbnailUrl: '/thumb/blanco.jpg', selected: true },
    { name: 'Azul Medianoche', hex: '#000080', thumbnailUrl: '/thumb/azul.jpg', selected: false },
  ];

  const props: ColorsSelectorProps = {
    color_selector: mockColorSelector,
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    (CustomText as jest.Mock).mockClear();
  });

  describe('When rendered initially', () => {
    it("Then it should display 'Color:' and the name of the initially selected color", () => {
      render(<ProductColorSelector {...props} />);

      const customTextElement = screen.getByTestId('mock-CustomText');
      expect(customTextElement).toBeInTheDocument();

      expect(customTextElement).toHaveTextContent('Color: Blanco Estelar');

      expect(customTextElement).toHaveAttribute('data-as', 'span');
      expect(customTextElement).toHaveAttribute('data-size', 'sm');
      expect(customTextElement).toHaveAttribute('data-color', '#0000008c');
      expect(customTextElement).toHaveAttribute('data-class-name', 'product-color-selector__label');
    });

    it('Then it should render all color option buttons with correct attributes', () => {
      render(<ProductColorSelector {...props} />);

      const colorOptionButtons = screen.getAllByRole('button', { name: /seleccionar color/i });
      expect(colorOptionButtons).toHaveLength(mockColorSelector.length);

      mockColorSelector.forEach((option) => {
        const button = screen.getByRole('button', { name: `Seleccionar color ${option.name}` });
        expect(button).toBeInTheDocument();

        const img = screen.getByAltText(option.name);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', option.thumbnailUrl);
      });
    });

    it('Then the initially selected color option should have the --selected class', () => {
      render(<ProductColorSelector {...props} />);

      const selectedOptionButton = screen.getByRole('button', {
        name: `Seleccionar color Blanco Estelar`,
      });
      expect(selectedOptionButton).toHaveClass('product-color-selector__thumbnail--selected');

      const nonSelectedOptionButton = screen.getByRole('button', {
        name: `Seleccionar color Negro Espacial`,
      });
      expect(nonSelectedOptionButton).not.toHaveClass(
        'product-color-selector__thumbnail--selected'
      );
    });

    it("Then it should initialize nameColor to 'Selecciona un color' if no option is selected", () => {
      const noSelectedProps: ColorsSelectorProps = {
        color_selector: [
          { name: 'Rojo', hex: '#FF0000', thumbnailUrl: '/thumb/rojo.jpg', selected: false },
          { name: 'Verde', hex: '#00FF00', thumbnailUrl: '/thumb/verde.jpg', selected: false },
        ],
      };
      render(<ProductColorSelector {...noSelectedProps} />);
      const customTextElement = screen.getByTestId('mock-CustomText');
      expect(customTextElement).toHaveTextContent('Color: Selecciona un color');
    });
  });

  describe('When interacting with color options', () => {
    it('Then the displayed color name should change on mouse enter', () => {
      render(<ProductColorSelector {...props} />);

      const customTextElement = screen.getByTestId('mock-CustomText');
      expect(customTextElement).toHaveTextContent('Color: Blanco Estelar');

      const negroEspacialButton = screen.getByRole('button', {
        name: `Seleccionar color Negro Espacial`,
      });
      fireEvent.mouseEnter(negroEspacialButton);

      expect(customTextElement).toHaveTextContent('Color: Negro Espacial');

      const azulMedianocheButton = screen.getByRole('button', {
        name: `Seleccionar color Azul Medianoche`,
      });
      fireEvent.mouseEnter(azulMedianocheButton);
      expect(customTextElement).toHaveTextContent('Color: Azul Medianoche');
    });

    it('Then clicking a color option should navigate to the correct product URL', () => {
      render(<ProductColorSelector {...props} />);

      const negroEspacialButton = screen.getByRole('button', {
        name: `Seleccionar color Negro Espacial`,
      });
      fireEvent.click(negroEspacialButton);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/thumb/negro.jpg');

      const blancoEstelarButton = screen.getByRole('button', {
        name: `Seleccionar color Blanco Estelar`,
      });
      fireEvent.click(blancoEstelarButton);

      expect(mockNavigate).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith('/thumb/blanco.jpg');
    });
  });
});
