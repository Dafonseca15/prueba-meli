import { render, screen } from '@testing-library/react';
import { CustomTitle } from '../CustomTitle';

describe('CustomTitle Component (BDD Style)', () => {
  const defaultProps = {
    children: 'My Awesome Title',
  };

  describe('Given a CustomTitle with basic properties', () => {
    beforeEach(() => {
      render(<CustomTitle {...defaultProps} />);
    });

    test('Then it should render the title text content in the document', () => {
      expect(screen.getByText('My Awesome Title')).toBeInTheDocument();
    });

    test('Then it should render as an <h1> by default', () => {
      const titleElement = screen.getByRole('heading', { level: 1, name: 'My Awesome Title' });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName).toBe('H1');
      expect(titleElement).toHaveClass('custom-title');
    });

    test('Then it should have default "md" size and "left" alignment classes', () => {
      const titleElement = screen.getByRole('heading', { level: 1, name: 'My Awesome Title' });
      expect(titleElement).toHaveClass('custom-title--size-md');
      expect(titleElement).toHaveClass('custom-title--align-left');
    });
  });

  describe('Given a CustomTitle rendered with different heading levels', () => {
    test('When rendered as "h2", then it should be an h2 tag', () => {
      render(
        <CustomTitle {...defaultProps} level="h2">
          Subtitle Level 2
        </CustomTitle>
      );
      const titleElement = screen.getByRole('heading', { level: 2, name: 'Subtitle Level 2' });
      expect(titleElement.tagName).toBe('H2');
      expect(titleElement).toHaveClass('custom-title--level-h2');
    });

    test('When rendered as "p", then it should be a paragraph tag', () => {
      render(
        <CustomTitle {...defaultProps} level="p">
          Paragraph Title
        </CustomTitle>
      );
      const textElement = screen.getByText('Paragraph Title');
      expect(textElement.tagName).toBe('P');
      expect(textElement).toHaveClass('custom-title--level-p');
    });

    test('When rendered as "h6", then it should be an h6 tag', () => {
      render(
        <CustomTitle {...defaultProps} level="h6">
          Smallest Heading
        </CustomTitle>
      );
      const titleElement = screen.getByRole('heading', { level: 6, name: 'Smallest Heading' });
      expect(titleElement.tagName).toBe('H6');
      expect(titleElement).toHaveClass('custom-title--level-h6');
    });
  });

  describe('Given a CustomTitle with different font sizes', () => {
    test('When rendered with size="sm", then it should have the small size class', () => {
      render(
        <CustomTitle {...defaultProps} size="sm">
          Small Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Small Title');
      expect(titleElement).toHaveClass('custom-title--size-sm');
    });

    test('When rendered with size="4xl", then it should have the extra large size class', () => {
      render(
        <CustomTitle {...defaultProps} size="4xl">
          Massive Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Massive Title');
      expect(titleElement).toHaveClass('custom-title--size-4xl');
    });
  });

  describe('Given a CustomTitle with different font weights (bold)', () => {
    test('When rendered with bold=true, then it should apply the default bold class', () => {
      render(
        <CustomTitle {...defaultProps} bold={true}>
          Bold Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Bold Title');
      expect(titleElement).toHaveClass('custom-title--bold-bold');
    });

    test('When rendered with bold="medium", then it should apply the specific bold class', () => {
      render(
        <CustomTitle {...defaultProps} bold="medium">
          Medium Bold Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Medium Bold Title');
      expect(titleElement).toHaveClass('custom-title--bold-medium');
    });

    test('When rendered with bold=false, then it should not apply any bold class', () => {
      render(
        <CustomTitle {...defaultProps} bold={false}>
          Normal Weight Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Normal Weight Title');
      expect(titleElement).not.toHaveClass('custom-title--bold-bold');
      expect(titleElement).not.toHaveClass('custom-title--bold-normal');
    });
  });

  describe('Given a CustomTitle with custom color', () => {
    test('When rendered with a color prop, then it should apply the inline color style', () => {
      render(
        <CustomTitle {...defaultProps} color="#FF00FF">
          Magenta Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Magenta Title');
      expect(titleElement).toHaveStyle('color: rgb(255, 0, 255);');
    });
  });

  describe('Given a CustomTitle with text alignment', () => {
    test('When rendered with align="center", then it should apply the center alignment class', () => {
      render(
        <CustomTitle {...defaultProps} align="center">
          Centered Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Centered Title');
      expect(titleElement).toHaveClass('custom-title--align-center');
    });

    test('When rendered with align="justify", then it should apply the justify alignment class', () => {
      render(
        <CustomTitle {...defaultProps} align="justify">
          Justified Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Justified Title');
      expect(titleElement).toHaveClass('custom-title--align-justify');
    });
  });

  describe('Given a CustomTitle with margin styles', () => {
    test('When rendered with marginTop and marginBottom, then it should apply inline styles', () => {
      render(
        <CustomTitle {...defaultProps} marginTop="30px" marginBottom="40px">
          Margined Title
        </CustomTitle>
      );
      const titleElement = screen.getByText('Margined Title');
      expect(titleElement).toHaveStyle('margin-top: 30px;');
      expect(titleElement).toHaveStyle('margin-bottom: 40px;');
    });
  });

  describe('Given a CustomTitle with additional className', () => {
    test('When rendered with className, then it should apply the custom class', () => {
      render(
        <CustomTitle {...defaultProps} className="header-style">
          Styled Header
        </CustomTitle>
      );
      const titleElement = screen.getByText('Styled Header');
      expect(titleElement).toHaveClass('header-style');
    });
  });
});
