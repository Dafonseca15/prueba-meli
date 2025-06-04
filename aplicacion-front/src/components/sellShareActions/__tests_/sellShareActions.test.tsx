import { render, screen } from '@testing-library/react';
import { SellShareActions } from '../sellShareActions';

import type { breadcrumbsMoreActions } from '../../../features/product-detail/types/product';

describe('SellShareActions Component (BDD Style)', () => {
  const mockActionsWithLinks: breadcrumbsMoreActions = {
    more_actions: [
      { text: 'Vender uno igual', url: '/sell' },
      { text: 'Preguntas y respuestas', url: '/qa' },
      { text: 'Denunciar', url: '/report' },
      { text: 'No tiene URL', url: undefined },
      { text: 'Sólo texto', url: '' },
    ],
  };

  const mockEmptyActions: breadcrumbsMoreActions = {
    more_actions: [],
  };

  describe('Given a SellShareActions component with mixed link and text actions', () => {
    beforeEach(() => {
      render(<SellShareActions {...mockActionsWithLinks} />);
    });

    test('Then it should render the correct number of action items', () => {
      const actionWrappers = screen.queryAllByTestId('action-item-wrapper');
      expect(actionWrappers).toHaveLength(mockActionsWithLinks.more_actions.length);
    });

    test('Then it should render links for actions with a URL', () => {
      const linkTexts = ['Vender uno igual', 'Preguntas y respuestas', 'Denunciar'];
      linkTexts.forEach((text) => {
        const linkElement = screen.getByRole('link', { name: text });
        const action = mockActionsWithLinks.more_actions.find((a) => a.text === text);
        if (!action || !action.url) {
          fail(`Action with text "${text}" not found or has no URL in mock data.`);
          return;
        }
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', action.url);
        expect(linkElement).toHaveClass('sell-share-actions__link');
      });
    });

    test('Then it should render spans for actions without a URL', () => {
      const spanTexts = ['No tiene URL', 'Sólo texto'];
      spanTexts.forEach((text) => {
        const textElement = screen.getByText(text);
        expect(textElement).toBeInTheDocument();
        expect(textElement.tagName).toBe('SPAN');
        expect(textElement).toHaveClass('sell-share-actions__link');
      });
    });

    test('Then the "separator" class should only be applied to the first item', () => {
      const firstItem = screen.getByText('Vender uno igual');
      const secondItem = screen.getByText('Preguntas y respuestas');
      const thirdItem = screen.getByText('Denunciar');
      const fourthItem = screen.getByText('No tiene URL');
      const fifthItem = screen.getByText('Sólo texto');

      expect(firstItem).toHaveClass('separator');
      expect(secondItem).not.toHaveClass('separator');
      expect(thirdItem).not.toHaveClass('separator');
      expect(fourthItem).not.toHaveClass('separator');
      expect(fifthItem).not.toHaveClass('separator');
    });
  });

  describe('Given a SellShareActions component with an empty actions array', () => {
    beforeEach(() => {
      render(<SellShareActions {...mockEmptyActions} />);
    });

    test('Then it should not render any action items', () => {
      const links = screen.queryAllByRole('link');
      expect(links).toHaveLength(0);

      const spans = screen
        .queryAllByText(/.*/)
        .filter(
          (element) =>
            element.tagName === 'SPAN' && element.classList.contains('sell-share-actions__link')
        );
      expect(spans).toHaveLength(0);
    });
  });

  describe('Given a SellShareActions component with a single link action', () => {
    const singleLinkActions: breadcrumbsMoreActions = {
      more_actions: [{ text: 'Solo un link', url: '/single' }],
    };

    beforeEach(() => {
      render(<SellShareActions {...singleLinkActions} />);
    });

    test('Then it should render the single link with the "separator" class', () => {
      const linkElement = screen.getByRole('link', { name: 'Solo un link' });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '/single');
      expect(linkElement).toHaveClass('separator');
    });
  });
});
