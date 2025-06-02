import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../Breadcrumbs';
import type { BreadCrumbsProps } from '../../../features/product-detail/types/product'; // Asegúrate de la ruta correcta

describe('Breadcrumbs Component (BDD Style)', () => {
  // Given: No se proporcionan ítems a Breadcrumbs
  describe('Given no items are provided to Breadcrumbs', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<Breadcrumbs items={[]} />);
    });

    // Then: No debe renderizar nada
    test('Then it should not render any breadcrumbs', () => {
      expect(screen.queryByRole('navigation', { name: 'breadcrumb' })).not.toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  // Given: Se proporcionan ítems válidos para el breadcrumb
  describe('Given valid items for the breadcrumb', () => {
    const mockItems: BreadCrumbsProps['items'] = [
      { text: 'Volver', url: '/home' }, // Primer elemento
      { text: 'Electrónica', url: '/electronica' }, // Elemento intermedio
      { text: 'Celulares', url: '/electronica/celulares' }, // Elemento intermedio
      { text: 'Samsung Galaxy', url: '/electronica/celulares/samsung' }, // Último elemento
    ];

    // When: Se renderiza el componente con los ítems
    beforeEach(() => {
      render(<Breadcrumbs items={mockItems} />);
    });

    // Then: Debe renderizar la navegación principal con el rol y label correctos
    test('Then it should render the main navigation with correct role and label', () => {
      const navElement = screen.getByRole('navigation', { name: 'breadcrumb' });
      expect(navElement).toBeInTheDocument();
      expect(navElement).toHaveClass('breadcrumbs');
    });

    // Then: Debe renderizar una lista ordenada
    test('Then it should render an ordered list', () => {
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByRole('list')).toHaveClass('breadcrumbs__list');
    });

    // Then: Debe renderizar cada ítem de la lista
    test('Then it should render all list items', () => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(mockItems.length); // 4 ítems
      listItems.forEach(item => {
        expect(item).toHaveClass('breadcrumbs__item');
      });
    });

    // Then: El primer elemento ("Volver") debe ser un enlace con su texto y un separador '|' interno
    test('Then the first item ("Volver") should be a link with its text and internal "|" separator', () => {
      const firstLink = screen.getByRole('link', { name: 'Volver |' }); // El name incluye el separador para getByRole
      expect(firstLink).toBeInTheDocument();
      expect(firstLink).toHaveAttribute('href', '/home');
      expect(firstLink).toHaveClass('breadcrumbs__link');
      // Verifica que el separador '|' está dentro del enlace
      expect(firstLink.querySelector('.breadcrumbs__link--separator')).toHaveTextContent('|');
    });

    // Then: Los elementos intermedios ("Electrónica", "Celulares") deben ser enlaces con texto y un separador '>' externo
    test('Then intermediate items should be links with text and an external ">" separator', () => {
      // Elemento "Electrónica"
      const linkElectronica = screen.getByRole('link', { name: 'Electrónica' });
      expect(linkElectronica).toBeInTheDocument();
      expect(linkElectronica).toHaveAttribute('href', '/electronica');
      expect(linkElectronica).toHaveClass('breadcrumbs__link');
      // El separador '>' debe ser el siguiente hermano del <li> que contiene el enlace
      // Accedemos al padre (li) y luego al siguiente hermano, que debería ser el span del separador
      expect(linkElectronica.parentNode?.nextSibling).not.toBeNull(); // Asegura que hay un siguiente hermano (li)
      // Necesitamos acceder al span del separador que es un hermano del <a> dentro del <li>
      // Según tu HTML, el separador '>' está fuera del <a>, pero es un hermano del <a> dentro del <li>
      // O sea, el separador esta fuera del <a> pero dentro del <li>.
      // Si el separador esta fuera del <li>, necesitas cambiar la forma de acceder
      const liElectronica = linkElectronica.closest('li');
      if (liElectronica) {
        // Busca el span del separador que es hermano del enlace dentro del mismo li
        const separatorSpan = liElectronica.querySelector('.breadcrumbs__link--separator');
        expect(separatorSpan).toBeInTheDocument();
        expect(separatorSpan).toHaveTextContent('>');
      }


      // Elemento "Celulares"
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


    // Then: El último elemento ("Samsung Galaxy") debe ser un enlace sin separador
    test('Then the last item ("Samsung Galaxy") should be a link without a separator', () => {
      const lastLink = screen.getByRole('link', { name: 'Samsung Galaxy' });
      expect(lastLink).toBeInTheDocument();
      expect(lastLink).toHaveAttribute('href', '/electronica/celulares/samsung');
      expect(lastLink).toHaveClass('breadcrumbs__link');
      // No debe haber un separador después de este elemento
      expect(lastLink.parentNode?.nextSibling).toBeNull(); // No hay siguiente <li>
      expect(lastLink.querySelector('.breadcrumbs__link--separator')).not.toBeInTheDocument(); // No hay separador interno
    });
  });

  // Given: Un único ítem en el breadcrumb
  describe('Given a single item in the breadcrumb', () => {
    const singleItem: BreadCrumbsProps['items'] = [{ text: 'Página Única', url: '/single' }];

    // When: Se renderiza
    beforeEach(() => {
      render(<Breadcrumbs items={singleItem} />);
    });

    // Then: Debe mostrar el ítem como un enlace con un separador '|' interno (ya que es el primer y único elemento)
    test('Then it should display the item as a link with an internal "|" separator', () => {
      const singleLink = screen.getByRole('link', { name: 'Página Única |' });
      expect(singleLink).toBeInTheDocument();
      expect(singleLink).toHaveAttribute('href', '/single');
      expect(singleLink).toHaveClass('breadcrumbs__link');
      // Verifica el separador interno
      expect(singleLink.querySelector('.breadcrumbs__link--separator')).toHaveTextContent('|');
      // No debe haber un nodo hermano (separador externo)
      expect(singleLink.parentNode?.nextSibling).toBeNull();
    });
  });
});