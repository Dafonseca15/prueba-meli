import { render, screen } from '@testing-library/react';
import { VisitOurStore } from '../VisitOurStore';
import type { sellerInfoProps } from '../../../../../types/product';

jest.mock('../../../../../../../components/CustomLink/CustomLink', () => ({
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

describe('Feature: Displaying Seller Store Visit Information', () => {
  const mockSellerInfo: sellerInfoProps['seller_info'] = {
    name: 'Tienda Oficial de Prueba',
    url: '/tienda/oficial',
    rating: 4.5,
    visitUs: 'Visita nuestra tienda oficial',
  };

  describe('Scenario: Component renders with valid seller information', () => {
    const componentProps = { seller_info: mockSellerInfo };

    beforeEach(() => {
      render(<VisitOurStore {...componentProps} />);
    });

    it('Then: the main container div should be present', () => {
      expect(screen.getByTestId('visit-our-store')).toBeInTheDocument();
      expect(screen.getByTestId('visit-our-store')).toHaveClass('visit-our-store');
    });

    it('And: the mocked CustomLink should be rendered with correct props', () => {
      const customLinkElement = screen.getByTestId('mock-CustomLink');
      expect(customLinkElement).toBeInTheDocument();
      expect(customLinkElement).toHaveAttribute('data-href', '#');
      expect(customLinkElement).toHaveAttribute('data-size', 'xs');
      expect(customLinkElement).toHaveAttribute('data-class-name', 'visit-our-store__link');
    });

    it('And: the CustomLink should contain the logo image with correct src and alt', () => {
      const customLinkElement = screen.getByTestId('mock-CustomLink');
      const imgElement = customLinkElement.querySelector('img');

      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute(
        'src',
        'https://http2.mlstatic.com/D_NQ_NP_865786-MLA83101123836_032025-G.jpg'
      );
      expect(imgElement).toHaveAttribute('alt', '');
      expect(imgElement).toHaveClass('logo');
    });

    it('And: the CustomLink should contain the seller_info.visitUs text', () => {
      const customLinkElement = screen.getByTestId('mock-CustomLink');
      expect(customLinkElement).toHaveTextContent(mockSellerInfo.visitUs);
    });

    it('And: the verified span should be present inside the CustomLink', () => {
      const customLinkElement = screen.getByTestId('mock-CustomLink');
      const verifiedSpan = customLinkElement.querySelector('.visit-our-store__link__verified');
      expect(verifiedSpan).toBeInTheDocument();
      expect(verifiedSpan).toHaveClass('visit-our-store__link__verified');
    });
  });
});
