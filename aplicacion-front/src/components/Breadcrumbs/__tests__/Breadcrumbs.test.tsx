import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import type { BreadCrumbsProps } from '../../../features/product-detail/types/product';

describe('Breadcrumbs Component (BDD Style)', () => {
  describe('Given no items are provided to Breadcrumbs', () => {
    beforeEach(() => {
      render(<Breadcrumbs items={[]} />);
    });

    test('Then it should not render any breadcrumbs', () => {
      expect(screen.queryByRole('navigation', { name: 'breadcrumb' })).not.toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Given valid items for the breadcrumb', () => {
    const mockItems: BreadCrumbsProps['items'] = [
      { text: 'Volver', url: '/home' },
      { text: 'Electrónica', url: '/electronica' },
      { text: 'Celulares', url: '/electronica/celulares' },
      { text: 'Samsung Galaxy', url: '/electronica/celulares/samsung' },
    ];

    beforeEach(() => {
      render(<Breadcrumbs items={mockItems} />);
    });

    test('Then it should render the main navigation with correct role and label', () => {
      const navElement = screen.getByRole('navigation', { name: 'breadcrumb' });
      expect(navElement).toBeInTheDocument();
      expect(navElement).toHaveClass('breadcrumbs');
    });

    test('Then it should render an ordered list', () => {
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByRole('list')).toHaveClass('breadcrumbs__list');
    });

    test('Then it should render all list items', () => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(mockItems.length);
      listItems.forEach((item) => {
        expect(item).toHaveClass('breadcrumbs__item');
      });
    });

    test('Then the first item ("Volver") should be a link with its text and internal "|" separator', () => {
      const firstLink = screen.getByRole('link', { name: 'Volver |' });
      expect(firstLink).toBeInTheDocument();
      expect(firstLink).toHaveAttribute('href', '/home');
      expect(firstLink).toHaveClass('breadcrumbs__link');
      expect(firstLink.querySelector('.breadcrumbs__link--separator')).toHaveTextContent('|');
    });

    test('Then intermediate items should be links with text and an external ">" separator', () => {
      const linkElectronica = screen.getByRole('link', { name: 'Electrónica' });
      expect(linkElectronica).toBeInTheDocument();
      expect(linkElectronica).toHaveAttribute('href', '/electronica');
      expect(linkElectronica).toHaveClass('breadcrumbs__link');
      expect(linkElectronica.parentNode?.nextSibling).not.toBeNull();
      const liElectronica = linkElectronica.closest('li');
      if (liElectronica) {
        const separatorSpan = liElectronica.querySelector('.breadcrumbs__link--separator');
        expect(separatorSpan).toBeInTheDocument();
        expect(separatorSpan).toHaveTextContent('>');
      }

      const linkCelulares = screen.getByRole('link', { name: 'Celulares' });
      expect(linkCelulares).toBeInTheDocument();
      expect(linkCelulares).toHaveAttribute('href', '/electronica/celulares');
      expect(linkCelulares).toHaveClass('breadcrumbs__link');
      const liCelulares = linkCelulares.closest('li');
      if (liCelulares) {
        const separatorSpan = liCelulares.querySelector('.breadcrumbs__link--separator');
        expect(separatorSpan).toBeInTheDocument();
        expect(separatorSpan).toHaveTextContent('>');
      }
    });

    test('Then the last item ("Samsung Galaxy") should be a link without a separator', () => {
      const lastLink = screen.getByRole('link', { name: 'Samsung Galaxy' });
      expect(lastLink).toBeInTheDocument();
      expect(lastLink).toHaveAttribute('href', '/electronica/celulares/samsung');
      expect(lastLink).toHaveClass('breadcrumbs__link');
      expect(lastLink.parentNode?.nextSibling).toBeNull();
      expect(lastLink.querySelector('.breadcrumbs__link--separator')).not.toBeInTheDocument();
    });
  });

  describe('Given a single item in the breadcrumb', () => {
    const singleItem: BreadCrumbsProps['items'] = [{ text: 'Página Única', url: '/single' }];

    beforeEach(() => {
      render(<Breadcrumbs items={singleItem} />);
    });

    test('Then it should display the item as a link with an internal "|" separator', () => {
      const singleLink = screen.getByRole('link', { name: 'Página Única |' });
      expect(singleLink).toBeInTheDocument();
      expect(singleLink).toHaveAttribute('href', '/single');
      expect(singleLink).toHaveClass('breadcrumbs__link');
      expect(singleLink.querySelector('.breadcrumbs__link--separator')).toHaveTextContent('|');
      expect(singleLink.parentNode?.nextSibling).toBeNull();
    });
  });
});
