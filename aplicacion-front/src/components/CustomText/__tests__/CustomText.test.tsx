// src/components/CustomText/__tests__/CustomText.test.tsx
import { render, screen } from '@testing-library/react';
import { CustomText } from '../CustomText'; // Asegúrate de la ruta correcta

describe('CustomText Component (BDD Style)', () => {
  const defaultProps = {
    children: 'Hello World',
  };

  // Given: Un CustomText con propiedades básicas
  describe('Given a CustomText with basic properties', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<CustomText {...defaultProps} />);
    });

    // Then: Debe renderizar el texto en el documento
    test('Then it should render the text content in the document', () => {
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    // Then: Debe renderizar como un <span> por defecto
    test('Then it should render as a <span> by default', () => {
      const textElement = screen.getByText('Hello World');
      expect(textElement.tagName).toBe('SPAN');
      expect(textElement).toHaveClass('custom-text');
    });

    // Then: Debe tener tamaño "md" y alineación "left" por defecto
    test('Then it should have default "md" size and "left" alignment classes', () => {
      const textElement = screen.getByText('Hello World');
      expect(textElement).toHaveClass('custom-text--size-md');
      expect(textElement).toHaveClass('custom-text--align-left');
    });
  });

  // Given: Un CustomText renderizado como diferentes etiquetas HTML
  describe('Given a CustomText rendered as different HTML tags', () => {
    // When: Se renderiza como <p>
    test('When rendered as "p", then it should be a paragraph tag', () => {
      render(<CustomText {...defaultProps} as="p">Paragraph Text</CustomText>);
      const textElement = screen.getByText('Paragraph Text');
      expect(textElement.tagName).toBe('P');
      expect(textElement).toHaveClass('custom-text--as-p');
    });

    // When: Se renderiza como <div>
    test('When rendered as "div", then it should be a div tag', () => {
      render(<CustomText {...defaultProps} as="div">Div Text</CustomText>);
      const textElement = screen.getByText('Div Text');
      expect(textElement.tagName).toBe('DIV');
      expect(textElement).toHaveClass('custom-text--as-div');
    });

    // When: Se renderiza como <strong>
    test('When rendered as "strong", then it should be a strong tag', () => {
      render(<CustomText {...defaultProps} as="strong">Strong Text</CustomText>);
      const textElement = screen.getByText('Strong Text');
      expect(textElement.tagName).toBe('STRONG');
      expect(textElement).toHaveClass('custom-text--as-strong');
    });
  });

  // Given: Un CustomText con diferentes tamaños de fuente
  describe('Given a CustomText with different font sizes', () => {
    // When: Se renderiza con size="sm"
    test('When rendered with size="sm", then it should have the small size class', () => {
      render(<CustomText {...defaultProps} size="sm">Small Text</CustomText>);
      const textElement = screen.getByText('Small Text');
      expect(textElement).toHaveClass('custom-text--size-sm');
    });

    // When: Se renderiza con size="xl"
    test('When rendered with size="xl", then it should have the extra large size class', () => {
      render(<CustomText {...defaultProps} size="xl">XL Text</CustomText>);
      const textElement = screen.getByText('XL Text');
      expect(textElement).toHaveClass('custom-text--size-xl');
    });
  });

  // Given: Un CustomText con diferentes pesos de fuente (bold)
  describe('Given a CustomText with different font weights (bold)', () => {
    // When: Se renderiza con bold=true
    test('When rendered with bold=true, then it should apply the default bold class', () => {
      render(<CustomText {...defaultProps} bold={true}>Bold Text</CustomText>);
      const textElement = screen.getByText('Bold Text');
      expect(textElement).toHaveClass('custom-text--bold-bold');
    });

    // When: Se renderiza con bold="semibold"
    test('When rendered with bold="semibold", then it should apply the specific bold class', () => {
      render(<CustomText {...defaultProps} bold="semibold">Semibold Text</CustomText>);
      const textElement = screen.getByText('Semibold Text');
      expect(textElement).toHaveClass('custom-text--bold-semibold');
    });

    // When: Se renderiza con bold=false
    test('When rendered with bold=false, then it should not apply any bold class', () => {
      render(<CustomText {...defaultProps} bold={false}>Normal Text</CustomText>);
      const textElement = screen.getByText('Normal Text');
      expect(textElement).not.toHaveClass('custom-text--bold-bold');
      expect(textElement).not.toHaveClass('custom-text--bold-normal'); // Asegura que no tenga clases de bold si es false
    });
  });

  // Given: Un CustomText con color personalizado
  describe('Given a CustomText with custom color', () => {
    // When: Se renderiza con un color específico
    test('When rendered with a color prop, then it should apply the inline color style', () => {
      render(<CustomText {...defaultProps} color="#0000FF">Blue Text</CustomText>);
      const textElement = screen.getByText('Blue Text');
      expect(textElement).toHaveStyle('color: rgb(0, 0, 255);'); // Jest converts hex to rgb
    });
  });

  // Given: Un CustomText con alineación de texto
  describe('Given a CustomText with text alignment', () => {
    // When: Se renderiza con align="center"
    test('When rendered with align="center", then it should apply the center alignment class', () => {
      render(<CustomText {...defaultProps} align="center">Center Text</CustomText>);
      const textElement = screen.getByText('Center Text');
      expect(textElement).toHaveClass('custom-text--align-center');
    });

    // When: Se renderiza con align="right"
    test('When rendered with align="right", then it should apply the right alignment class', () => {
      render(<CustomText {...defaultProps} align="right">Right Text</CustomText>);
      const textElement = screen.getByText('Right Text');
      expect(textElement).toHaveClass('custom-text--align-right');
    });
  });

  // Given: Un CustomText con márgenes
  describe('Given a CustomText with margin styles', () => {
    // When: Se renderiza con marginTop y marginBottom
    test('When rendered with marginTop and marginBottom, then it should apply inline styles', () => {
      render(
        <CustomText {...defaultProps} marginTop="15px" marginBottom="25px">
          Margined Text
        </CustomText>
      );
      const textElement = screen.getByText('Margined Text');
      expect(textElement).toHaveStyle('margin-top: 15px;');
      expect(textElement).toHaveStyle('margin-bottom: 25px;');
    });
  });

  // Given: Un CustomText con clases CSS adicionales
  describe('Given a CustomText with additional className', () => {
    // When: Se renderiza con className="my-extra-class"
    test('When rendered with className, then it should apply the custom class', () => {
      render(<CustomText {...defaultProps} className="my-extra-class">Extra Class Text</CustomText>);
      const textElement = screen.getByText('Extra Class Text');
      expect(textElement).toHaveClass('my-extra-class');
    });
  });
});