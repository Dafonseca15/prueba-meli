// src/components/CustomButton/__tests__/CustomButton.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomButton } from '../CustomButton'; // Asegúrate de la ruta correcta

describe('CustomButton Component (BDD Style)', () => {
  const defaultProps = {
    onClick: jest.fn(), // Mock de la función onClick
    children: 'Click Me',
  };

  // Given: Un CustomButton con propiedades básicas
  describe('Given a CustomButton with basic properties', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<CustomButton {...defaultProps} />);
    });

    // Then: Debe renderizar el botón en el documento
    test('Then it should render the button in the document', () => {
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    // Then: Debe mostrar el texto (children) correctamente
    test('Then it should display the correct text content', () => {
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    // Then: Debe tener el tipo "primary" y tamaño "md" por defecto
    test('Then it should have default "primary" type and "md" size classes', () => {
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toHaveClass('custom-button--type-primary');
      expect(button).toHaveClass('custom-button--size-md');
    });

    // Then: Debe llamar a la función onClick cuando se hace clic
    test('Then it should call the onClick function when clicked', async () => {
      const button = screen.getByRole('button', { name: 'Click Me' });
      await userEvent.click(button);
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });
  });

  // Given: Un CustomButton con diferentes tipos de estilo
  describe('Given a CustomButton with different style types', () => {
    // When: Se renderiza con type="secondary"
    test('When rendered with type="secondary", then it should have the secondary type class', () => {
      render(<CustomButton {...defaultProps} type="secondary">Secondary Button</CustomButton>);
      const button = screen.getByRole('button', { name: 'Secondary Button' });
      expect(button).toHaveClass('custom-button--type-secondary');
      expect(button).not.toHaveClass('custom-button--type-primary');
    });
  });

  // Given: Un CustomButton con diferentes tamaños
  describe('Given a CustomButton with different sizes', () => {
    // When: Se renderiza con size="sm"
    test('When rendered with size="sm", then it should have the small size class', () => {
      render(<CustomButton {...defaultProps} size="sm">Small Button</CustomButton>);
      const button = screen.getByRole('button', { name: 'Small Button' });
      expect(button).toHaveClass('custom-button--size-sm');
    });

    // When: Se renderiza con size="lg"
    test('When rendered with size="lg", then it should have the large size class', () => {
      render(<CustomButton {...defaultProps} size="lg">Large Button</CustomButton>);
      const button = screen.getByRole('button', { name: 'Large Button' });
      expect(button).toHaveClass('custom-button--size-lg');
    });
  });

  // Given: Un CustomButton deshabilitado
  describe('Given a disabled CustomButton', () => {
    // When: Se renderiza con disabled=true
    beforeEach(() => {
      render(<CustomButton {...defaultProps} disabled={true}>Disabled Button</CustomButton>);
    });

    // Then: Debe estar deshabilitado
    test('Then it should be disabled', () => {
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      expect(button).toBeDisabled();
    });
  });

  // Given: Un CustomButton con clases personalizadas
  describe('Given a CustomButton with custom classes', () => {
    // When: Se renderiza con una clase adicional
    test('When rendered with a className, then it should apply the custom class', () => {
      render(<CustomButton {...defaultProps} className="my-custom-class">Custom Class Button</CustomButton>);
      const button = screen.getByRole('button', { name: 'Custom Class Button' });
      expect(button).toHaveClass('my-custom-class');
    });
  });

  // Given: Un CustomButton con fullWidth
  describe('Given a CustomButton with fullWidth', () => {
    // When: Se renderiza con fullWidth=true
    test('When rendered with fullWidth=true, then it should apply the full-width class', () => {
      render(<CustomButton {...defaultProps} fullWidth={true}>Full Width Button</CustomButton>);
      const button = screen.getByRole('button', { name: 'Full Width Button' });
      expect(button).toHaveClass('custom-button--full-width');
    });
  });

  // Given: Un CustomButton con estilos de margen
  describe('Given a CustomButton with margin styles', () => {
    // When: Se renderiza con marginTop y marginBottom
    test('When rendered with marginTop and marginBottom, then it should apply inline styles', () => {
      render(
        <CustomButton {...defaultProps} marginTop="10px" marginBottom="20px">
          Margined Button
        </CustomButton>
      );
      const button = screen.getByRole('button', { name: 'Margined Button' });
      expect(button).toHaveStyle('margin-top: 10px;');
      expect(button).toHaveStyle('margin-bottom: 20px;');
    });
  });
});