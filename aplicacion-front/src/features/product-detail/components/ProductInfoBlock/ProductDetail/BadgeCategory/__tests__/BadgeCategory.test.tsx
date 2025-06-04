jest.mock('../../../../../../../components/CustomLink/CustomLink', () => ({
  CustomLink: jest.fn(({ children, href, size }) => (
    <a data-testid="mock-custom-link" href={href} data-size={size}>
      {children}
    </a>
  )),
}));

import { render, screen } from '@testing-library/react';
import { BadgeCategory } from '../BadgeCategory';
import type { badgeInfoProps } from '../../../../../types/product';

describe('BadgeCategory Component (BDD Style)', () => {
  const defaultBadgeInfo: badgeInfoProps = {
    badge_info: {
      text: 'Nuevo',
      category_position: 'En',
      category_text: 'Celulares y Smartphones',
      category_url: '/category/MLA1051',
    },
  };

  describe('Given a BadgeCategory component', () => {
    describe('When it is rendered with complete badge information', () => {
      beforeEach(() => {
        render(<BadgeCategory badge_info={defaultBadgeInfo.badge_info} />);
      });

      test('Then it should render the badge text correctly', () => {
        const badgeText = screen.getByText(defaultBadgeInfo.badge_info.text);
        expect(badgeText).toBeInTheDocument();
        expect(badgeText).toHaveClass('badge-category-container__badge');
      });

      test('Then it should render the mocked CustomLink', () => {
        const customLink = screen.getByTestId('mock-custom-link');
        expect(customLink).toBeInTheDocument();
      });

      test('Then the CustomLink should have the correct combined text', () => {
        const expectedLinkText = `${defaultBadgeInfo.badge_info.category_position} ${defaultBadgeInfo.badge_info.category_text}`;
        const customLink = screen.getByText(expectedLinkText);
        expect(customLink).toBeInTheDocument();
      });

      test('Then the CustomLink should have the correct href', () => {
        const customLink = screen.getByTestId('mock-custom-link');
        expect(customLink).toHaveAttribute('href', defaultBadgeInfo.badge_info.category_url);
      });

      test('Then the CustomLink should have the correct "size" prop', () => {
        const customLink = screen.getByTestId('mock-custom-link');

        expect(customLink).toHaveAttribute('data-size', 'xs');
      });
    });

    describe('When rendered with empty category position or text', () => {
      const emptyCategoryInfo: badgeInfoProps = {
        badge_info: {
          text: 'Oferta',
          category_position: '',
          category_text: 'Otros',
          category_url: '/category/others',
        },
      };

      beforeEach(() => {
        render(<BadgeCategory badge_info={emptyCategoryInfo.badge_info} />);
      });

      test('Then the CustomLink should handle empty position gracefully', () => {
        const customLink = screen.getByTestId('mock-custom-link');
        expect(customLink).toBeInTheDocument();

        expect(customLink.textContent?.trim()).toBe(emptyCategoryInfo.badge_info.category_text);
      });
    });
  });
});
