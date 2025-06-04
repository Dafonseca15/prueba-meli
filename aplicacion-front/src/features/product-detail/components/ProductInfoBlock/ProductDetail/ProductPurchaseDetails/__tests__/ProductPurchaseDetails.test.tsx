import { render, screen } from '@testing-library/react';
import type { ProductDetailProps } from '../../../../../types/product';
import { CustomText } from '../../../../../../../components/CustomText/CustomText';
import { CustomLink } from '../../../../../../../components/CustomLink/CustomLink';
import { ProductPurchaseDetails } from '../ProductPurchaseDetails';

jest.mock('../../../../../../../components/CustomLink/CustomLink', () => ({
  CustomLink: jest.fn(({ children, href, size }) => (
    <a data-testid="mock-CustomLink" data-href={href} data-size={size} href={href}>
      {children}
    </a>
  )),
}));

jest.mock('../../../../../../../components/CustomText/CustomText', () => ({
  CustomText: jest.fn(({ children, as, size, marginBottom, color, className }) => (
    <span
      data-testid="mock-CustomText"
      data-as={as || 'span'}
      data-size={size}
      data-margin-bottom={marginBottom}
      data-color={color}
      data-class-name={className}
    >
      {children}
    </span>
  )),
}));

describe('Feature: Product Purchase Details Display', () => {
  const purchaseFullData: ProductDetailProps['purchase'] = {
    currency: 'USD',
    amount: 99.99,
    decimals: 2,
    original_amount: 120.0,
    installments: {
      quantity: 12,
      amount: 10.0,
      rate: 15.0,
    },
    discount_percentage: 17,
    promotion: {
      discount: 5,
      tc_agreement: 'Válido con tarjeta XYZ',
    },
  };

  const purchaseMinimalData: ProductDetailProps['purchase'] = {
    currency: 'CLP',
    amount: 50000,
    decimals: 0,
    original_amount: null,
    installments: null,
    discount_percentage: null,
    promotion: null,
  };

  const purchaseZeroDiscount: ProductDetailProps['purchase'] = {
    ...purchaseFullData,
    original_amount: 100,
    discount_percentage: 0,
    installments: null,
    promotion: null,
  };

  const purchaseZeroInstallments: ProductDetailProps['purchase'] = {
    ...purchaseFullData,
    installments: {
      quantity: 0,
      amount: 0,
      rate: 0,
    },
    promotion: null,
  };

  const purchaseNoTCAgreement: ProductDetailProps['purchase'] = {
    ...purchaseFullData,
    promotion: {
      discount: 10,
      tc_agreement: null,
    },
  };

  beforeEach(() => {
    (CustomLink as jest.Mock).mockClear();
    (CustomText as jest.Mock).mockClear();
  });

  describe('Scenario: Displaying all purchase details for a product', () => {
    const productData = purchaseFullData;

    beforeEach(() => {
      render(<ProductPurchaseDetails purchase={productData} />);
    });

    it('Then: el contenedor principal debería estar presente', () => {
      expect(screen.getByTestId('product-purchase-details')).toBeInTheDocument();
      expect(screen.getByTestId('product-purchase-details')).toHaveClass(
        'product-purchase-details'
      );
    });

    it('And: el precio original debería mostrarse si es mayor que el actual', () => {
      const originalPriceElement = screen.getByTestId('product-purchase-details__original-price');
      expect(originalPriceElement).toBeInTheDocument();
      expect(originalPriceElement).toHaveClass('product-purchase-details__original-price');
    });

    it('And: el precio actual debería mostrarse', () => {
      const currentPriceElement = screen.getByTestId('product-purchase-details__current-price');
      expect(currentPriceElement).toBeInTheDocument();
      expect(currentPriceElement).toHaveClass('product-purchase-details__current-price');
    });

    it('And: el porcentaje de descuento debería mostrarse si es mayor que 0', () => {
      const discountPercentageElement = screen.getByTestId(
        'product-purchase-details__discount-percentage'
      );
      expect(discountPercentageElement).toBeInTheDocument();
      expect(discountPercentageElement).toHaveClass(
        'product-purchase-details__discount-percentage'
      );
      expect(discountPercentageElement).toHaveTextContent(
        `${productData.discount_percentage}% OFF`
      );
    });

    it('And: los detalles de las cuotas deberían mostrarse con CustomText', () => {
      const installmentsTextElement = screen.getByTestId('mock-CustomText');
      expect(installmentsTextElement).toBeInTheDocument();
      expect(installmentsTextElement).toHaveAttribute('data-as', 'p');
      expect(installmentsTextElement).toHaveAttribute('data-size', 'md');
      expect(installmentsTextElement).toHaveAttribute('data-margin-bottom', '1rem');
      expect(installmentsTextElement).toHaveAttribute('data-color', '#343434');
      expect(installmentsTextElement).toHaveAttribute(
        'data-class-name',
        'product-purchase-details__installments'
      );
    });

    it('And: el texto de la promoción debería mostrarse', () => {
      const promotionElement = screen.getByTestId('product-purchase-details__tc-agreement');
      expect(promotionElement).toBeInTheDocument();
      expect(promotionElement).toHaveClass('product-purchase-details__tc-agreement');

      const promotionTextElement = screen.getByTestId(
        'product-purchase-details__tc-agreement__text'
      );
      expect(promotionTextElement).toBeInTheDocument();
      expect(promotionTextElement).toHaveTextContent(
        `${productData.promotion!.discount}% OFF ${productData.promotion!.tc_agreement}`
      );
    });

    it("And: el enlace 'Ver los medios de pago' debería mostrarse", () => {
      const customLinkElement = screen.getByTestId('mock-CustomLink');
      expect(customLinkElement).toBeInTheDocument();
      expect(customLinkElement).toHaveTextContent('Ver los medios de pago');
      expect(customLinkElement).toHaveAttribute('data-href', '#');
      expect(customLinkElement).toHaveAttribute('data-size', 'xs');
    });
  });

  describe('Scenario: Displaying minimal purchase details for a product', () => {
    const productData = purchaseMinimalData;

    beforeEach(() => {
      render(<ProductPurchaseDetails purchase={productData} />);
    });

    it('Then: el contenedor principal y el precio actual deberían estar presentes', () => {
      expect(screen.getByTestId('product-purchase-details')).toBeInTheDocument();
      expect(screen.getByTestId('product-purchase-details__current-price')).toBeInTheDocument();
    });

    it('And: el precio original no debería mostrarse', () => {
      expect(
        screen.queryByTestId('product-purchase-details__original-price')
      ).not.toBeInTheDocument();
    });

    it('And: el porcentaje de descuento no debería mostrarse', () => {
      expect(
        screen.queryByTestId('product-purchase-details__discount-percentage')
      ).not.toBeInTheDocument();
    });

    it('And: los detalles de las cuotas no deberían mostrarse', () => {
      expect(screen.queryByTestId('mock-CustomText')).not.toBeInTheDocument();
    });

    it('And: el texto de la promoción no debería mostrarse', () => {
      expect(
        screen.queryByTestId('product-purchase-details__tc-agreement')
      ).not.toBeInTheDocument();
    });

    it("And: el enlace 'Ver los medios de pago' aún debería mostrarse", () => {
      expect(screen.getByTestId('mock-CustomLink')).toBeInTheDocument();
    });
  });

  describe('Scenario: Handling edge cases for purchase details', () => {
    it('Given: un precio original igual al actual, When: el componente se renderiza, Then: el precio original no debería mostrarse', () => {
      const data = { ...purchaseFullData, original_amount: purchaseFullData.amount };
      render(<ProductPurchaseDetails purchase={data} />);
      expect(
        screen.queryByTestId('product-purchase-details__original-price')
      ).not.toBeInTheDocument();
    });

    it('Given: un porcentaje de descuento de 0, When: el componente se renderiza, Then: el porcentaje de descuento no debería mostrarse', () => {
      render(<ProductPurchaseDetails purchase={purchaseZeroDiscount} />);
      expect(
        screen.queryByTestId('product-purchase-details__discount-percentage')
      ).not.toBeInTheDocument();
    });

    it('Given: una cantidad de cuotas de 0, When: el componente se renderiza, Then: los detalles de las cuotas no deberían mostrarse', () => {
      render(<ProductPurchaseDetails purchase={purchaseZeroInstallments} />);
      expect(screen.queryByTestId('mock-CustomText')).not.toBeInTheDocument();
    });

    it('Given: una promoción sin acuerdo de términos, When: el componente se renderiza, Then: el texto de la promoción no debería mostrarse', () => {
      render(<ProductPurchaseDetails purchase={purchaseNoTCAgreement} />);
      expect(
        screen.queryByTestId('product-purchase-details__tc-agreement')
      ).not.toBeInTheDocument();
    });
  });
});
