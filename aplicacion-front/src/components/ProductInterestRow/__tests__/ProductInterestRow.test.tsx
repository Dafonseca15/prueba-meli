import { render, screen } from '@testing-library/react';
import { ProductInterestRow } from '../ProductInterestRow';

describe('ProductInterestRow Component (BDD Style)', () => {
  const defaultProps = {
    title: 'Te podría interesar',
    items: [
      { text: 'Celulares', url: 'celulares' },
      { text: 'Laptops', url: 'laptops' },
      { text: 'Auriculares', url: 'auriculares' },
    ],
  };

  describe('Given a ProductInterestRow with a title and multiple items', () => {
    beforeEach(() => {
      render(<ProductInterestRow {...defaultProps} />);
    });

    test('Then it should render the title correctly', () => {
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.title)).toHaveClass('interest-row-content__title');
    });

    test('Then it should render each item as a link', () => {
      defaultProps.items.forEach((item) => {
        const link = screen.getByRole('link', { name: item.text });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `/search?q=${item.url}`);
        expect(link).toHaveClass('interest-row-content__item-link');
      });
    });

    test('Then it should render separators between items but not after the last one', () => {
      const separators = screen.queryAllByTestId('item-separator');
      expect(separators).toHaveLength(defaultProps.items.length - 1);
    });
  });

  describe('Given a ProductInterestRow with a title and an empty items list', () => {
    const emptyProps = {
      title: 'Búsquedas recientes',
      items: [],
    };

    beforeEach(() => {
      render(<ProductInterestRow {...emptyProps} />);
    });

    test('Then it should render the title', () => {
      expect(screen.getByText(emptyProps.title)).toBeInTheDocument();
    });

    test('Then it should not render any links', () => {
      const links = screen.queryAllByRole('link');
      expect(links).toHaveLength(0);
    });

    test('Then it should not render any separators', () => {
      const separators = screen.queryAllByText(' - ');
      expect(separators).toHaveLength(0);
    });
  });

  describe('Given a ProductInterestRow with a single item', () => {
    const singleItemProps = {
      title: 'Solo un elemento',
      items: [{ text: 'Único', url: 'unico' }],
    };

    beforeEach(() => {
      render(<ProductInterestRow {...singleItemProps} />);
    });

    test('Then it should render the title', () => {
      expect(screen.getByText(singleItemProps.title)).toBeInTheDocument();
    });

    test('Then it should render the single link', () => {
      const link = screen.getByRole('link', { name: 'Único' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/search?q=unico');
    });

    test('Then it should not render any separators', () => {
      const separators = screen.queryAllByText(' - ');
      expect(separators).toHaveLength(0);
    });
  });
});
