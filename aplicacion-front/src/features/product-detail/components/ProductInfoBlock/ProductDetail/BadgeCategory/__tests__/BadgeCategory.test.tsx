// Mockear CustomLink
// Usaremos un data-testid para encontrar el link mockeado y verificar sus props
jest.mock('../../../../../../../components/CustomLink/CustomLink', () => ({
    CustomLink: jest.fn(({ children, href, size }) => (
      // Renderizamos un 'a' simple con data-testid para poder testearlo
      <a data-testid="mock-custom-link" href={href} data-size={size}>
        {children}
      </a>
    )),
  }));
  
  import { render, screen } from '@testing-library/react';
  import { BadgeCategory } from '../BadgeCategory';
  import type { badgeInfoProps } from '../../../../../types/product'; // Asegúrate de esta ruta
  
  
  describe('BadgeCategory Component (BDD Style)', () => {
    // Datos de prueba para el componente
    const defaultBadgeInfo: badgeInfoProps = {
      badge_info: {
        text: 'Nuevo',
        category_position: 'En',
        category_text: 'Celulares y Smartphones',
        category_url: '/category/MLA1051',
      },
    };
  
    // Given: Un componente BadgeCategory
    describe('Given a BadgeCategory component', () => {
  
      // When: Es renderizado con información completa del badge
      describe('When it is rendered with complete badge information', () => {
        beforeEach(() => {
          render(<BadgeCategory badge_info={defaultBadgeInfo.badge_info} />);
        });
  
        // Then: Debe renderizar el texto del badge correctamente
        test('Then it should render the badge text correctly', () => {
          const badgeText = screen.getByText(defaultBadgeInfo.badge_info.text);
          expect(badgeText).toBeInTheDocument();
          expect(badgeText).toHaveClass('badge-category-container__badge');
        });
  
        // Then: Debe renderizar el CustomLink mockeado
        test('Then it should render the mocked CustomLink', () => {
          const customLink = screen.getByTestId('mock-custom-link');
          expect(customLink).toBeInTheDocument();
        });
  
        // Then: El CustomLink debe tener el texto combinado correcto
        test('Then the CustomLink should have the correct combined text', () => {
          const expectedLinkText = `${defaultBadgeInfo.badge_info.category_position} ${defaultBadgeInfo.badge_info.category_text}`;
          const customLink = screen.getByText(expectedLinkText); // Busca por el texto que se pasa como children
          expect(customLink).toBeInTheDocument();
        });
  
        // Then: El CustomLink debe tener el href correcto
        test('Then the CustomLink should have the correct href', () => {
          const customLink = screen.getByTestId('mock-custom-link');
          expect(customLink).toHaveAttribute('href', defaultBadgeInfo.badge_info.category_url);
        });
  
        // Then: El CustomLink debe tener la prop 'size' correcta
        test('Then the CustomLink should have the correct "size" prop', () => {
          const customLink = screen.getByTestId('mock-custom-link');
          // Cuando mockeas, puedes pasar props como data-atributos para testearlos
          expect(customLink).toHaveAttribute('data-size', 'xs');
        });
      });
  
      // When: Se renderiza con texto de categoría vacío o nulo (opcional, si estos campos pueden ser vacíos)
      // Este test es útil si category_position o category_text pudieran venir vacíos
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
            // Verifica que el textContent incluya "Otros" y el posible espacio extra
            // .trim() elimina espacios iniciales/finales para una comparación limpia
            expect(customLink.textContent?.trim()).toBe(emptyCategoryInfo.badge_info.category_text);

        });
      });
    });
  });