import { render, screen } from '@testing-library/react';
import { CustomText } from '../CustomText';

describe('CustomText Component (BDD Style)', () => {
  const defaultProps = {
    children: 'Hello World',
  };

  describe('Given a CustomText with basic properties', () => {
    beforeEach(() => {
      render(<CustomText {...defaultProps} />);
    });

    test('Then it should render the text content in the document', () => {
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    test('Then it should render as a <span> by default', () => {
      const textElement = screen.getByText('Hello World');
      expect(textElement.tagName).toBe('SPAN');
      expect(textElement).toHaveClass('custom-text');
    });

    test('Then it should have default "md" size and "left" alignment classes', () => {
      const textElement = screen.getByText('Hello World');
      expect(textElement).toHaveClass('custom-text--size-md');
      expect(textElement).toHaveClass('custom-text--align-left');
    });
  });

  describe('Given a CustomText rendered as different HTML tags', () => {
    test('When rendered as "p", then it should be a paragraph tag', () => {
      render(
        <CustomText {...defaultProps} as="p">
          Paragraph Text
        </CustomText>
      );
      const textElement = screen.getByText('Paragraph Text');
      expect(textElement.tagName).toBe('P');
      expect(textElement).toHaveClass('custom-text--as-p');
    });

    test('When rendered as "div", then it should be a div tag', () => {
      render(
        <CustomText {...defaultProps} as="div">
          Div Text
        </CustomText>
      );
      const textElement = screen.getByText('Div Text');
      expect(textElement.tagName).toBe('DIV');
      expect(textElement).toHaveClass('custom-text--as-div');
    });

    test('When rendered as "strong", then it should be a strong tag', () => {
      render(
        <CustomText {...defaultProps} as="strong">
          Strong Text
        </CustomText>
      );
      const textElement = screen.getByText('Strong Text');
      expect(textElement.tagName).toBe('STRONG');
      expect(textElement).toHaveClass('custom-text--as-strong');
    });
  });

  describe('Given a CustomText with different font sizes', () => {
    test('When rendered with size="sm", then it should have the small size class', () => {
      render(
        <CustomText {...defaultProps} size="sm">
          Small Text
        </CustomText>
      );
      const textElement = screen.getByText('Small Text');
      expect(textElement).toHaveClass('custom-text--size-sm');
    });

    test('When rendered with size="xl", then it should have the extra large size class', () => {
      render(
        <CustomText {...defaultProps} size="xl">
          XL Text
        </CustomText>
      );
      const textElement = screen.getByText('XL Text');
      expect(textElement).toHaveClass('custom-text--size-xl');
    });
  });

  describe('Given a CustomText with different font weights (bold)', () => {
    test('When rendered with bold=true, then it should apply the default bold class', () => {
      render(
        <CustomText {...defaultProps} bold={true}>
          Bold Text
        </CustomText>
      );
      const textElement = screen.getByText('Bold Text');
      expect(textElement).toHaveClass('custom-text--bold-bold');
    });

    test('When rendered with bold="semibold", then it should apply the specific bold class', () => {
      render(
        <CustomText {...defaultProps} bold="semibold">
          Semibold Text
        </CustomText>
      );
      const textElement = screen.getByText('Semibold Text');
      expect(textElement).toHaveClass('custom-text--bold-semibold');
    });

    test('When rendered with bold=false, then it should not apply any bold class', () => {
      render(
        <CustomText {...defaultProps} bold={false}>
          Normal Text
        </CustomText>
      );
      const textElement = screen.getByText('Normal Text');
      expect(textElement).not.toHaveClass('custom-text--bold-bold');
      expect(textElement).not.toHaveClass('custom-text--bold-normal');
    });
  });

  describe('Given a CustomText with custom color', () => {
    test('When rendered with a color prop, then it should apply the inline color style', () => {
      render(
        <CustomText {...defaultProps} color="#0000FF">
          Blue Text
        </CustomText>
      );
      const textElement = screen.getByText('Blue Text');
      expect(textElement).toHaveStyle('color: rgb(0, 0, 255);');
    });
  });

  describe('Given a CustomText with text alignment', () => {
    test('When rendered with align="center", then it should apply the center alignment class', () => {
      render(
        <CustomText {...defaultProps} align="center">
          Center Text
        </CustomText>
      );
      const textElement = screen.getByText('Center Text');
      expect(textElement).toHaveClass('custom-text--align-center');
    });

    test('When rendered with align="right", then it should apply the right alignment class', () => {
      render(
        <CustomText {...defaultProps} align="right">
          Right Text
        </CustomText>
      );
      const textElement = screen.getByText('Right Text');
      expect(textElement).toHaveClass('custom-text--align-right');
    });
  });

  describe('Given a CustomText with margin styles', () => {
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

  describe('Given a CustomText with additional className', () => {
    test('When rendered with className, then it should apply the custom class', () => {
      render(
        <CustomText {...defaultProps} className="my-extra-class">
          Extra Class Text
        </CustomText>
      );
      const textElement = screen.getByText('Extra Class Text');
      expect(textElement).toHaveClass('my-extra-class');
    });
  });
});
