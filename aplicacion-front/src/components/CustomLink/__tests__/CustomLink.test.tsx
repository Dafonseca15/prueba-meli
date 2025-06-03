import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomLink } from '../CustomLink';

describe('CustomLink Component (BDD Style)', () => {
  const defaultProps = {
    href: '/test-url',
    children: 'Link Text',
  };
  const mockOnClick = jest.fn();

  // Given: Un CustomLink con propiedades básicas
  describe('Given a CustomLink with basic properties', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<CustomLink {...defaultProps} />);
    });

    // Then: Debe renderizar el enlace en el documento
    test('Then it should render the link in the document', () => {
      expect(screen.getByRole('link', { name: 'Link Text' })).toBeInTheDocument();
    });

    // Then: Debe mostrar el texto (children) correctamente
    test('Then it should display the correct text content', () => {
      expect(screen.getByText('Link Text')).toBeInTheDocument();
    });

    // Then: Debe tener el atributo href correcto
    test('Then it should have the correct href attribute', () => {
      const link = screen.getByRole('link', { name: 'Link Text' });
      expect(link).toHaveAttribute('href', '/test-url');
    });

    // Then: Debe tener el tipo "text" y tamaño "md" por defecto
    test('Then it should have default "text" type and "md" size classes', () => {
      const link = screen.getByRole('link', { name: 'Link Text' });
      expect(link).toHaveClass('custom-link--type-text');
      expect(link).toHaveClass('custom-link--size-md');
    });

    // Then: Debe tener subrayado al hover por defecto
    test('Then it should have default "underline-hover" class', () => {
      const link = screen.getByRole('link', { name: 'Link Text' });
      expect(link).toHaveClass('custom-link--underline-hover');
    });
  });

  // Given: Un CustomLink con diferentes tipos de estilo
  describe('Given a CustomLink with different style types', () => {
    // When: Se renderiza con type="button"
    test('When rendered with type="button", then it should have the button type class', () => {
      render(<CustomLink {...defaultProps} type="button">Button Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Button Link' });
      expect(link).toHaveClass('custom-link--type-button');
    });

    // When: Se renderiza con type="primary"
    test('When rendered with type="primary", then it should have the primary type class', () => {
      render(<CustomLink {...defaultProps} type="primary">Primary Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Primary Link' });
      expect(link).toHaveClass('custom-link--type-primary');
    });
  });

  // Given: Un CustomLink con diferentes tamaños
  describe('Given a CustomLink with different sizes', () => {
    // When: Se renderiza con size="xs"
    test('When rendered with size="xs", then it should have the extra small size class', () => {
      render(<CustomLink {...defaultProps} size="xs">XS Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'XS Link' });
      expect(link).toHaveClass('custom-link--size-xs');
    });

    // When: Se renderiza con size="lg"
    test('When rendered with size="lg", then it should have the large size class', () => {
      render(<CustomLink {...defaultProps} size="lg">LG Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'LG Link' });
      expect(link).toHaveClass('custom-link--size-lg');
    });
  });

  // Given: Un CustomLink con peso de fuente específico
  describe('Given a CustomLink with specific font weight', () => {
    // When: Se renderiza con bold=true
    test('When rendered with bold=true, then it should apply the default bold class', () => {
      render(<CustomLink {...defaultProps} bold={true}>Bold Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Bold Link' });
      expect(link).toHaveClass('custom-link--bold-bold');
    });

    // When: Se renderiza con bold="semibold"
    test('When rendered with bold="semibold", then it should apply the specific bold class', () => {
      render(<CustomLink {...defaultProps} bold="semibold">Semibold Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Semibold Link' });
      expect(link).toHaveClass('custom-link--bold-semibold');
    });

    // When: Se renderiza con bold=false
    test('When rendered with bold=false, then it should not apply any bold class', () => {
      render(<CustomLink {...defaultProps} bold={false}>Not Bold Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Not Bold Link' });
      expect(link).not.toHaveClass('custom-link--bold-bold');
      expect(link).not.toHaveClass('custom-link--bold-semibold');
    });
  });

  // Given: Un CustomLink con color personalizado
  describe('Given a CustomLink with custom color', () => {
    // When: Se renderiza con un color específico
    test('When rendered with a color prop, then it should apply the inline color style', () => {
      render(<CustomLink {...defaultProps} color="#FF0000">Red Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Red Link' });
      expect(link).toHaveStyle('color: rgb(255, 0, 0);'); // Jest converts hex to rgb for style check
    });
  });

  // Given: Un CustomLink con diferentes opciones de subrayado
  describe('Given a CustomLink with different underline options', () => {
    // When: Se renderiza con underline=true
    test('When rendered with underline=true, then it should apply the always-underline class', () => {
      render(<CustomLink {...defaultProps} underline={true}>Always Underline</CustomLink>);
      const link = screen.getByRole('link', { name: 'Always Underline' });
      expect(link).toHaveClass('custom-link--underline-always');
    });

    // When: Se renderiza con underline=false
    test('When rendered with underline=false, then it should apply the no-underline class', () => {
      render(<CustomLink {...defaultProps} underline={false}>No Underline</CustomLink>);
      const link = screen.getByRole('link', { name: 'No Underline' });
      expect(link).toHaveClass('custom-link--underline-none');
    });
  });

  // Given: Un CustomLink con className adicional
  describe('Given a CustomLink with additional className', () => {
    // When: Se renderiza con className="extra-class"
    test('When rendered with className, then it should apply the custom class', () => {
      render(<CustomLink {...defaultProps} className="extra-class">Extra Class Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Extra Class Link' });
      expect(link).toHaveClass('extra-class');
    });
  });

  // Given: Un CustomLink con un manejador onClick
  describe('Given a CustomLink with an onClick handler', () => {
    // When: Se hace clic en el enlace
    test('When clicked, then it should call the onClick function', async () => {
      render(<CustomLink {...defaultProps} onClick={mockOnClick}>Clickable Link</CustomLink>);
      const link = screen.getByRole('link', { name: 'Clickable Link' });
      await userEvent.click(link);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  // Given: Un CustomLink con target y rel
  describe('Given a CustomLink with target and rel attributes', () => {
    // When: Se renderiza con target="_blank" y rel="noopener noreferrer"
    test('When rendered with target="_blank" and rel, then it should apply those attributes', () => {
      render(
        <CustomLink {...defaultProps} target="_blank" rel="noopener noreferrer">
          External Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'External Link' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});