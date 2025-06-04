import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomLink } from '../CustomLink';

describe('CustomLink Component (BDD Style)', () => {
  const defaultProps = {
    href: '/test-url',
    children: 'Link Text',
  };
  const mockOnClick = jest.fn();

  describe('Given a CustomLink with basic properties', () => {
    beforeEach(() => {
      render(<CustomLink {...defaultProps} />);
    });

    test('Then it should render the link in the document', () => {
      expect(screen.getByRole('link', { name: 'Link Text' })).toBeInTheDocument();
    });

    test('Then it should display the correct text content', () => {
      expect(screen.getByText('Link Text')).toBeInTheDocument();
    });

    test('Then it should have the correct href attribute', () => {
      const link = screen.getByRole('link', { name: 'Link Text' });
      expect(link).toHaveAttribute('href', '/test-url');
    });

    test('Then it should have default "text" type and "md" size classes', () => {
      const link = screen.getByRole('link', { name: 'Link Text' });
      expect(link).toHaveClass('custom-link--type-text');
      expect(link).toHaveClass('custom-link--size-md');
    });

    test('Then it should have default "underline-hover" class', () => {
      const link = screen.getByRole('link', { name: 'Link Text' });
      expect(link).toHaveClass('custom-link--underline-hover');
    });
  });

  describe('Given a CustomLink with different style types', () => {
    test('When rendered with type="button", then it should have the button type class', () => {
      render(
        <CustomLink {...defaultProps} type="button">
          Button Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Button Link' });
      expect(link).toHaveClass('custom-link--type-button');
    });

    test('When rendered with type="primary", then it should have the primary type class', () => {
      render(
        <CustomLink {...defaultProps} type="primary">
          Primary Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Primary Link' });
      expect(link).toHaveClass('custom-link--type-primary');
    });
  });

  describe('Given a CustomLink with different sizes', () => {
    test('When rendered with size="xs", then it should have the extra small size class', () => {
      render(
        <CustomLink {...defaultProps} size="xs">
          XS Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'XS Link' });
      expect(link).toHaveClass('custom-link--size-xs');
    });

    test('When rendered with size="lg", then it should have the large size class', () => {
      render(
        <CustomLink {...defaultProps} size="lg">
          LG Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'LG Link' });
      expect(link).toHaveClass('custom-link--size-lg');
    });
  });

  describe('Given a CustomLink with specific font weight', () => {
    test('When rendered with bold=true, then it should apply the default bold class', () => {
      render(
        <CustomLink {...defaultProps} bold={true}>
          Bold Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Bold Link' });
      expect(link).toHaveClass('custom-link--bold-bold');
    });

    test('When rendered with bold="semibold", then it should apply the specific bold class', () => {
      render(
        <CustomLink {...defaultProps} bold="semibold">
          Semibold Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Semibold Link' });
      expect(link).toHaveClass('custom-link--bold-semibold');
    });

    test('When rendered with bold=false, then it should not apply any bold class', () => {
      render(
        <CustomLink {...defaultProps} bold={false}>
          Not Bold Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Not Bold Link' });
      expect(link).not.toHaveClass('custom-link--bold-bold');
      expect(link).not.toHaveClass('custom-link--bold-semibold');
    });
  });

  describe('Given a CustomLink with custom color', () => {
    test('When rendered with a color prop, then it should apply the inline color style', () => {
      render(
        <CustomLink {...defaultProps} color="#FF0000">
          Red Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Red Link' });
      expect(link).toHaveStyle('color: rgb(255, 0, 0);');
    });
  });

  describe('Given a CustomLink with different underline options', () => {
    test('When rendered with underline=true, then it should apply the always-underline class', () => {
      render(
        <CustomLink {...defaultProps} underline={true}>
          Always Underline
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Always Underline' });
      expect(link).toHaveClass('custom-link--underline-always');
    });

    test('When rendered with underline=false, then it should apply the no-underline class', () => {
      render(
        <CustomLink {...defaultProps} underline={false}>
          No Underline
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'No Underline' });
      expect(link).toHaveClass('custom-link--underline-none');
    });
  });

  describe('Given a CustomLink with additional className', () => {
    test('When rendered with className, then it should apply the custom class', () => {
      render(
        <CustomLink {...defaultProps} className="extra-class">
          Extra Class Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Extra Class Link' });
      expect(link).toHaveClass('extra-class');
    });
  });

  describe('Given a CustomLink with an onClick handler', () => {
    test('When clicked, then it should call the onClick function', async () => {
      render(
        <CustomLink {...defaultProps} onClick={mockOnClick}>
          Clickable Link
        </CustomLink>
      );
      const link = screen.getByRole('link', { name: 'Clickable Link' });
      await userEvent.click(link);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Given a CustomLink with target and rel attributes', () => {
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
