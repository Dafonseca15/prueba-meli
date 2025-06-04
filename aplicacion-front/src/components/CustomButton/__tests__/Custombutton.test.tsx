import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomButton } from '../CustomButton';

describe('CustomButton Component (BDD Style)', () => {
  const defaultProps = {
    onClick: jest.fn(),
    children: 'Click Me',
  };

  describe('Given a CustomButton with basic properties', () => {
    beforeEach(() => {
      render(<CustomButton {...defaultProps} />);
    });

    test('Then it should render the button in the document', () => {
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    test('Then it should display the correct text content', () => {
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('Then it should have default "primary" type and "md" size classes', () => {
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toHaveClass('custom-button--type-primary');
      expect(button).toHaveClass('custom-button--size-md');
    });

    test('Then it should call the onClick function when clicked', async () => {
      const button = screen.getByRole('button', { name: 'Click Me' });
      await userEvent.click(button);
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Given a CustomButton with different style types', () => {
    test('When rendered with type="secondary", then it should have the secondary type class', () => {
      render(
        <CustomButton {...defaultProps} type="secondary">
          Secondary Button
        </CustomButton>
      );
      const button = screen.getByRole('button', { name: 'Secondary Button' });
      expect(button).toHaveClass('custom-button--type-secondary');
      expect(button).not.toHaveClass('custom-button--type-primary');
    });
  });

  describe('Given a CustomButton with different sizes', () => {
    test('When rendered with size="sm", then it should have the small size class', () => {
      render(
        <CustomButton {...defaultProps} size="sm">
          Small Button
        </CustomButton>
      );
      const button = screen.getByRole('button', { name: 'Small Button' });
      expect(button).toHaveClass('custom-button--size-sm');
    });

    test('When rendered with size="lg", then it should have the large size class', () => {
      render(
        <CustomButton {...defaultProps} size="lg">
          Large Button
        </CustomButton>
      );
      const button = screen.getByRole('button', { name: 'Large Button' });
      expect(button).toHaveClass('custom-button--size-lg');
    });
  });

  describe('Given a disabled CustomButton', () => {
    beforeEach(() => {
      render(
        <CustomButton {...defaultProps} disabled={true}>
          Disabled Button
        </CustomButton>
      );
    });

    test('Then it should be disabled', () => {
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      expect(button).toBeDisabled();
    });
  });

  describe('Given a CustomButton with custom classes', () => {
    test('When rendered with a className, then it should apply the custom class', () => {
      render(
        <CustomButton {...defaultProps} className="my-custom-class">
          Custom Class Button
        </CustomButton>
      );
      const button = screen.getByRole('button', { name: 'Custom Class Button' });
      expect(button).toHaveClass('my-custom-class');
    });
  });

  describe('Given a CustomButton with fullWidth', () => {
    test('When rendered with fullWidth=true, then it should apply the full-width class', () => {
      render(
        <CustomButton {...defaultProps} fullWidth={true}>
          Full Width Button
        </CustomButton>
      );
      const button = screen.getByRole('button', { name: 'Full Width Button' });
      expect(button).toHaveClass('custom-button--full-width');
    });
  });

  describe('Given a CustomButton with margin styles', () => {
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
