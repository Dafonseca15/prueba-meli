// src/components/SellShareActions/__tests__/SellShareActions.test.tsx
import { render, screen } from '@testing-library/react';
import { SellShareActions } from '../SellShareActions';
// Importa el tipo real de breadcrumbsMoreActions desde su ubicación
import type { breadcrumbsMoreActions } from '../../features/product-detail/types/product'; 

describe('SellShareActions Component (BDD Style)', () => {

  // Dados un conjunto de acciones con URLs y sin URLs
  const mockActionsWithLinks: breadcrumbsMoreActions = {
    more_actions: [
      { text: 'Vender uno igual', url: '/sell' },
      { text: 'Preguntas y respuestas', url: '/qa' },
      { text: 'Denunciar', url: '/report' },
      { text: 'No tiene URL', url: undefined }, // O simplemente omitir 'url'
      { text: 'Sólo texto', url: '' }, // URL vacía, también debería ser un span si no se maneja en el componente
    ],
  };

  // Dado un conjunto de acciones donde solo la primera es un link
  const mockActionsMixed: breadcrumbsMoreActions = {
    more_actions: [
      { text: 'Primer link', url: '/first' },
      { text: 'Solo texto 2', url: undefined },
      { text: 'Solo texto 3', url: undefined },
    ],
  };

  // Dado un conjunto de acciones vacío
  const mockEmptyActions: breadcrumbsMoreActions = {
    more_actions: [],
  };

  // Given: Componente con acciones que son enlaces y texto
  describe('Given a SellShareActions component with mixed link and text actions', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<SellShareActions {...mockActionsWithLinks} />);
    });

    // Then: Debe renderizar el número correcto de elementos
    test('Then it should render the correct number of action items', () => {
      // Contamos los divs contenedores de cada acción
      const actionWrappers = screen.queryAllByTestId('action-item-wrapper'); // div no tiene un rol específico, 'generic' es un rol base para div
      expect(actionWrappers).toHaveLength(mockActionsWithLinks.more_actions.length);
    });

    // Then: Debe renderizar enlaces para las acciones con URL
    test('Then it should render links for actions with a URL', () => {
      const linkTexts = ['Vender uno igual', 'Preguntas y respuestas', 'Denunciar'];
      linkTexts.forEach(text => {
        const linkElement = screen.getByRole('link', { name: text });
        const action = mockActionsWithLinks.more_actions.find(a => a.text === text);
        if (!action || !action.url) {
            fail(`Action with text "${text}" not found or has no URL in mock data.`);
            return;
        }
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', action.url);
        expect(linkElement).toHaveClass('sell-share-actions__link');
      });
    });

    // Then: Debe renderizar spans para las acciones sin URL
    test('Then it should render spans for actions without a URL', () => {
      const spanTexts = ['No tiene URL', 'Sólo texto']; // Estos no tienen rol 'link'
      spanTexts.forEach(text => {
        const textElement = screen.getByText(text); // Encuentra el span por su texto
        expect(textElement).toBeInTheDocument();
        expect(textElement.tagName).toBe('SPAN'); // Verifica que sea un SPAN
        expect(textElement).toHaveClass('sell-share-actions__link');
      });
    });

    // Then: La clase 'separator' debe aplicarse solo al primer elemento
    test('Then the "separator" class should only be applied to the first item', () => {
        // Obtenemos todos los elementos que deberían tener la clase sell-share-actions__link
        // Puedes obtenerlos por su texto y luego verificar la clase
        const firstItem = screen.getByText('Vender uno igual');
        const secondItem = screen.getByText('Preguntas y respuestas');
        const thirdItem = screen.getByText('Denunciar');
        const fourthItem = screen.getByText('No tiene URL');
        const fifthItem = screen.getByText('Sólo texto');

        expect(firstItem).toHaveClass('separator'); // El primer elemento sí debe tenerla
        expect(secondItem).not.toHaveClass('separator');
        expect(thirdItem).not.toHaveClass('separator');
        expect(fourthItem).not.toHaveClass('separator');
        expect(fifthItem).not.toHaveClass('separator');
      });
  });

  // Given: Componente con un array de acciones vacío
  describe('Given a SellShareActions component with an empty actions array', () => {
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<SellShareActions {...mockEmptyActions} />);
    });

    // Then: No debe renderizar ningún elemento de acción
    test('Then it should not render any action items', () => {
        const links = screen.queryAllByRole('link');
        expect(links).toHaveLength(0);
  
        // Query para cualquier span que tenga la clase sell-share-actions__link
        // O solo byText si sabes que no habrá otros spans irrelevantes
        const spans = screen.queryAllByText(/.*/).filter(element => 
          element.tagName === 'SPAN' && element.classList.contains('sell-share-actions__link')
        );
        expect(spans).toHaveLength(0);
    });
  });

  // Given: Componente con solo un enlace
  describe('Given a SellShareActions component with a single link action', () => {
    const singleLinkActions: breadcrumbsMoreActions = {
      more_actions: [{ text: 'Solo un link', url: '/single' }],
    };
    
    // When: Se renderiza el componente
    beforeEach(() => {
      render(<SellShareActions {...singleLinkActions} />);
    });

    // Then: Debe renderizar el enlace único y con la clase 'separator'
    test('Then it should render the single link with the "separator" class', () => {
      const linkElement = screen.getByRole('link', { name: 'Solo un link' });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '/single');
      expect(linkElement).toHaveClass('separator'); // Porque es el primer (y único) elemento
    });
  });
});