// src/components/ProductInterestRow/__tests__/ProductInterestRow.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductInterestRow } from '../ProductInterestRow'; // Asegúrate de la ruta correcta

describe('ProductInterestRow Component (BDD Style)', () => {
  const defaultProps = {
    title: 'Te podría interesar',
    items: [
      { text: 'Celulares', url: 'celulares' },
      { text: 'Laptops', url: 'laptops' },
      { text: 'Auriculares', url: 'auriculares' },
    ],
  };

  // Given: Un ProductInterestRow con un título y varios elementos
  describe('Given a ProductInterestRow with a title and multiple items', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<ProductInterestRow {...defaultProps} />);
    });

    // Then: Debe renderizar el título correctamente
    test('Then it should render the title correctly', () => {
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.title)).toHaveClass('interest-row-content__title');
    });

    // Then: Debe renderizar cada ítem como un enlace
    test('Then it should render each item as a link', () => {
      defaultProps.items.forEach(item => {
        const link = screen.getByRole('link', { name: item.text });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `/search?q=${item.url}`);
        expect(link).toHaveClass('interest-row-content__item-link');
      });
    });

    // Then: Debe renderizar los separadores correctamente entre los elementos
    test('Then it should render separators between items but not after the last one', () => {
      // Obtenemos todos los elementos con la clase del separador
      const separators = screen.queryAllByTestId('item-separator');
      expect(separators).toHaveLength(defaultProps.items.length - 1); // Debe haber N-1 separadores
    });
  });

  // Given: Un ProductInterestRow con un título y una lista de elementos vacía
  describe('Given a ProductInterestRow with a title and an empty items list', () => {
    const emptyProps = {
      title: 'Búsquedas recientes',
      items: [],
    };

    // When: Se renderiza el componente
    beforeEach(() => {
      render(<ProductInterestRow {...emptyProps} />);
    });

    // Then: Debe renderizar el título
    test('Then it should render the title', () => {
      expect(screen.getByText(emptyProps.title)).toBeInTheDocument();
    });

    // Then: No debe renderizar ningún enlace
    test('Then it should not render any links', () => {
      const links = screen.queryAllByRole('link');
      expect(links).toHaveLength(0);
    });

    // Then: No debe renderizar ningún separador
    test('Then it should not render any separators', () => {
      const separators = screen.queryAllByText(' - ');
      expect(separators).toHaveLength(0);
    });
  });

  // Given: Un ProductInterestRow con un solo elemento
  describe('Given a ProductInterestRow with a single item', () => {
    const singleItemProps = {
      title: 'Solo un elemento',
      items: [{ text: 'Único', url: 'unico' }],
    };

    // When: Se renderiza el componente
    beforeEach(() => {
      render(<ProductInterestRow {...singleItemProps} />);
    });

    // Then: Debe renderizar el título
    test('Then it should render the title', () => {
      expect(screen.getByText(singleItemProps.title)).toBeInTheDocument();
    });

    // Then: Debe renderizar el único enlace
    test('Then it should render the single link', () => {
      const link = screen.getByRole('link', { name: 'Único' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/search?q=unico');
    });

    // Then: No debe renderizar ningún separador
    test('Then it should not render any separators', () => {
      const separators = screen.queryAllByText(' - ');
      expect(separators).toHaveLength(0);
    });
  });
});