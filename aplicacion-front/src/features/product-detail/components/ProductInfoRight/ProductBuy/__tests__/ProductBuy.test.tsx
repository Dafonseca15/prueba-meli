import { render, screen, fireEvent } from '@testing-library/react';
import { ProductBuy } from '../ProductBuy';
import type { BuyAndDeliveryProps } from '../../../../types/product';
import { CustomButton } from '../../../../../../components/CustomButton/CustomButton';
import { CustomLink } from '../../../../../../components/CustomLink/CustomLink';
import { CustomText } from '../../../../../../components/CustomText/CustomText';
import { CustomTitle } from '../../../../../../components/CustomTitle/CustomTitle';

jest.mock('../../../../../../components/CustomButton/CustomButton', () => ({
  CustomButton: jest.fn(({ children, onClick, type, size, fullWidth, marginTop }) => (
    <button
      data-testid="mock-CustomButton"
      onClick={onClick}
      data-type={type}
      data-size={size}
      data-full-width={fullWidth}
      data-margin-top={marginTop}
    >
      {children}
    </button>
  )),
}));

jest.mock('../../../../../../components/CustomLink/CustomLink', () => ({
  CustomLink: jest.fn(({ children, href, size, className }) => (
    <a
      data-testid="mock-CustomLink"
      data-href={href}
      data-size={size}
      data-class-name={className}
      href={href}
    >
      {children}
    </a>
  )),
}));

jest.mock('../../../../../../components/CustomText/CustomText', () => ({
  CustomText: jest.fn(({ children, as, size, color, className, marginTop, bold }) => (
    <span
      data-testid="mock-CustomText"
      data-as={as || 'span'}
      data-size={size}
      data-color={color}
      data-class-name={className}
      data-margin-top={marginTop}
      data-bold={bold}
    >
      {children}
    </span>
  )),
}));

jest.mock('../../../../../../components/CustomTitle/CustomTitle', () => ({
  CustomTitle: jest.fn(({ children, level, size, bold, marginBottom, marginTop }) => (
    <h3
      data-testid="mock-CustomTitle"
      data-level={level}
      data-size={size}
      data-bold={bold}
      data-margin-bottom={marginBottom}
      data-margin-top={marginTop}
    >
      {children}
    </h3>
  )),
}));

jest.mock('../../../../../../assets/images/ReturnIcon.png', () => 'ReturnIcon.png');
jest.mock('../../../../../../assets/images/ShieldIcon.png', () => 'ShieldIcon.png');
jest.mock('../../../../../../assets/images/MedalIcon.png', () => 'MedalIcon.png');

const mockWindowOpen = jest.fn();
const originalWindowOpen = window.open;
beforeAll(() => {
  window.open = mockWindowOpen;
});
afterAll(() => {
  window.open = originalWindowOpen;
});

describe('Feature: Product Buy and Delivery Details Display', () => {
  const fullBuyAndDeliveryData: BuyAndDeliveryProps = {
    buy_and_delivery: {
      delivery: {
        title: 'Envío gratis',
        description: 'Llega mañana',
        calculate_shipping: 'Calcular cuándo llega',
        shipping_url: '/shipping-calculator',
      },
      disponibility: {
        title: 'Stock disponible',
      },
      actions: [
        { text: 'Comprar ahora', url: '/buy-now', is_primary: true },
        { text: 'Agregar al carrito', url: '/add-to-cart', is_primary: false },
      ],
      benefits: [
        { icon: 'return', text: 'Devolución gratis', description: 'Tienes 30 días' },
        {
          icon: 'shield',
          text: 'Compra Protegida',
          description: 'Recibe el producto que esperabas',
        },
        { icon: 'medal', text: 'Mercado Puntos', description: 'Suma puntos con esta compra' },
      ],
    },
    seller: 'Mercado Libre',
  };

  const minimalBuyAndDeliveryData: BuyAndDeliveryProps = {
    buy_and_delivery: {
      delivery: {
        title: 'Envío estándar',
        description: 'Llega en 5 días',
        calculate_shipping: null,
        shipping_url: null,
      },
      disponibility: {
        title: 'Últimas unidades',
      },
      actions: [{ text: 'Comprar', url: '/buy', is_primary: true }],
      benefits: null,
    },
    seller: 'Vendedor Individual',
  };

  beforeEach(() => {
    (CustomButton as jest.Mock).mockClear();
    (CustomLink as jest.Mock).mockClear();
    (CustomText as jest.Mock).mockClear();
    (CustomTitle as jest.Mock).mockClear();
    mockWindowOpen.mockClear();
  });

  describe('Scenario: Component renders with all available data', () => {
    const componentProps = fullBuyAndDeliveryData;

    beforeEach(() => {
      render(<ProductBuy {...componentProps} />);
    });

    it('Then: the main container should be present', () => {
      expect(screen.getByTestId('product-buy-container')).toBeInTheDocument();
      expect(screen.getByTestId('product-buy-container')).toHaveClass('product-buy-container');
    });

    it('And: the delivery section should display correct CustomText and CustomLink', () => {
      const deliveryTitleText = screen.getAllByTestId('mock-CustomText')[0];
      expect(deliveryTitleText).toBeInTheDocument();
      expect(deliveryTitleText).toHaveTextContent(
        `${componentProps.buy_and_delivery.delivery.title} a todo el país`
      );
      expect(deliveryTitleText).toHaveAttribute('data-bold', 'true');
      expect(deliveryTitleText).toHaveAttribute('data-color', '#00a650');
      expect(deliveryTitleText).toHaveAttribute('data-size', 'md');

      const deliveryDescriptionText = screen.getAllByTestId('mock-CustomText')[1];
      expect(deliveryDescriptionText).toBeInTheDocument();
      expect(deliveryDescriptionText).toHaveTextContent(
        componentProps.buy_and_delivery.delivery.description
      );
      expect(deliveryDescriptionText).toHaveAttribute('data-color', '#0000008c');
      expect(deliveryDescriptionText).toHaveAttribute('data-size', 'xs');

      const calculateShippingLink = screen.getByTestId('mock-CustomLink');
      expect(calculateShippingLink).toBeInTheDocument();
      expect(calculateShippingLink).toHaveTextContent(
        componentProps.buy_and_delivery.delivery.calculate_shipping!
      );
      expect(calculateShippingLink).toHaveAttribute(
        'data-href',
        componentProps.buy_and_delivery.delivery.shipping_url!
      );
      expect(calculateShippingLink).toHaveAttribute('data-size', 'xs');
    });

    it('And: the disponibility title should be rendered with CustomTitle', () => {
      const disponibilityTitle = screen.getByTestId('mock-CustomTitle');
      expect(disponibilityTitle).toBeInTheDocument();
      expect(disponibilityTitle).toHaveTextContent(
        componentProps.buy_and_delivery.disponibility.title
      );
      expect(disponibilityTitle).toHaveAttribute('data-level', 'h3');
      expect(disponibilityTitle).toHaveAttribute('data-size', '2xl');
      expect(disponibilityTitle).toHaveAttribute('data-bold', 'bold');
      expect(disponibilityTitle).toHaveAttribute('data-margin-bottom', '1.5rem');
      expect(disponibilityTitle).toHaveAttribute('data-margin-top', '1.5rem');
    });

    it('And: all action buttons should be rendered with correct props and behavior', () => {
      const actionButtons = screen.getAllByTestId('mock-CustomButton');
      expect(actionButtons).toHaveLength(componentProps.buy_and_delivery.actions.length);

      const buyNowButton = screen.getByText('Comprar ahora');
      expect(buyNowButton).toBeInTheDocument();
      expect(buyNowButton).toHaveAttribute('data-type', 'primary');
      expect(buyNowButton).toHaveAttribute('data-size', 'sm');
      expect(buyNowButton).toHaveAttribute('data-full-width', 'true');
      expect(buyNowButton).toHaveAttribute('data-margin-top', '0');
      fireEvent.click(buyNowButton);
      expect(mockWindowOpen).toHaveBeenCalledWith(
        componentProps.buy_and_delivery.actions[0].url,
        '_blank'
      );

      const addToCartButton = screen.getByText('Agregar al carrito');
      expect(addToCartButton).toBeInTheDocument();
      expect(addToCartButton).toHaveAttribute('data-type', 'secondary');
      expect(addToCartButton).toHaveAttribute('data-size', 'sm');
      expect(addToCartButton).toHaveAttribute('data-full-width', 'true');
      expect(addToCartButton).toHaveAttribute('data-margin-top', '0.5rem');
      fireEvent.click(addToCartButton);
      expect(mockWindowOpen).toHaveBeenCalledWith(
        componentProps.buy_and_delivery.actions[1].url,
        '_blank'
      );
    });

    it('And: the seller text should be displayed', () => {
      const sellerTextElement = screen.getAllByTestId('mock-CustomText')[2];
      expect(sellerTextElement).toBeInTheDocument();
      expect(sellerTextElement).toHaveTextContent(`Vendido por ${componentProps.seller}`);
      expect(sellerTextElement).toHaveAttribute('data-size', 'xs');
      expect(sellerTextElement).toHaveAttribute('data-margin-top', '1.5rem');
    });

    it('And: all benefits should be rendered with correct icons and text', () => {
      const benefitElements = screen.getAllByTestId('product-buy-container__benefits-item');
      expect(benefitElements).toHaveLength(componentProps.buy_and_delivery.benefits!.length);

      const returnBenefit = benefitElements[0];
      const returnIcon = returnBenefit.querySelector('img');
      expect(returnIcon).toBeInTheDocument();
      expect(returnIcon).toHaveAttribute('src', 'ReturnIcon.png');
      expect(returnIcon).toHaveClass('product-buy-container__icon');
      expect(returnBenefit).toHaveTextContent(componentProps.buy_and_delivery.benefits![0].text);
      expect(returnBenefit).toHaveTextContent(
        componentProps.buy_and_delivery.benefits![0].description!
      );

      const shieldBenefit = benefitElements[1];
      const shieldIcon = shieldBenefit.querySelector('img');
      expect(shieldIcon).toBeInTheDocument();
      expect(shieldIcon).toHaveAttribute('src', 'ShieldIcon.png');
      expect(shieldIcon).toHaveClass('product-buy-container__icon');
      expect(shieldBenefit).toHaveTextContent(componentProps.buy_and_delivery.benefits![1].text);
      expect(shieldBenefit).toHaveTextContent(
        componentProps.buy_and_delivery.benefits![1].description!
      );

      const medalBenefit = benefitElements[2];
      const medalIcon = medalBenefit.querySelector('img');
      expect(medalIcon).toBeInTheDocument();
      expect(medalIcon).toHaveAttribute('src', 'MedalIcon.png');
      expect(medalIcon).toHaveClass('product-buy-container__icon');
      expect(medalBenefit).toHaveTextContent(componentProps.buy_and_delivery.benefits![2].text);
      expect(medalBenefit).toHaveTextContent(
        componentProps.buy_and_delivery.benefits![2].description!
      );
    });
  });

  describe('Scenario: Component renders with minimal data', () => {
    const componentProps = minimalBuyAndDeliveryData;

    beforeEach(() => {
      render(<ProductBuy {...componentProps} />);
    });

    it('Then: the delivery section should display correct CustomText and NO CustomLink', () => {
      const deliveryTitleText = screen.getAllByTestId('mock-CustomText')[0];
      expect(deliveryTitleText).toBeInTheDocument();
      expect(deliveryTitleText).toHaveTextContent(
        `${componentProps.buy_and_delivery.delivery.title} a todo el país`
      );

      const deliveryDescriptionText = screen.getAllByTestId('mock-CustomText')[1];
      expect(deliveryDescriptionText).toBeInTheDocument();
      expect(deliveryDescriptionText).toHaveTextContent(
        componentProps.buy_and_delivery.delivery.description
      );

      expect(screen.queryByTestId('mock-CustomLink')).not.toBeInTheDocument();
    });

    it('And: the disponibility title should be rendered with CustomTitle', () => {
      const disponibilityTitle = screen.getByTestId('mock-CustomTitle');
      expect(disponibilityTitle).toBeInTheDocument();
      expect(disponibilityTitle).toHaveTextContent(
        componentProps.buy_and_delivery.disponibility.title
      );
    });

    it('And: only one action button should be rendered', () => {
      const actionButtons = screen.getAllByTestId('mock-CustomButton');
      expect(actionButtons).toHaveLength(1);
      expect(actionButtons[0]).toHaveTextContent('Comprar');
      expect(actionButtons[0]).toHaveAttribute('data-type', 'primary');
      expect(actionButtons[0]).toHaveAttribute('data-margin-top', '0');
    });

    it('And: the seller text should be displayed', () => {
      const sellerTextElement = screen.getAllByTestId('mock-CustomText')[2];
      expect(sellerTextElement).toBeInTheDocument();
      expect(sellerTextElement).toHaveTextContent(`Vendido por ${componentProps.seller}`);
    });

    it('And: the benefits section should NOT be rendered', () => {
      expect(screen.queryByTestId('product-buy-container__benefits-item')).not.toBeInTheDocument();
    });
  });
});
