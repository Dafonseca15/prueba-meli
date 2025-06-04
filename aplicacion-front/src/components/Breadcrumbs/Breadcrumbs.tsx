import type { BreadCrumbsProps } from '../../features/product-detail/types/product';
import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC<BreadCrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const isFirstItem = index === 0;
          const key = index;

          return (
            <li key={key} className="breadcrumbs__item">
              {/* El primer elemento lleva un separador distinto */}
              {isFirstItem ? (
                <a href={item.url} className="breadcrumbs__link">
                  {item.text}
                  <span className="breadcrumbs__link--separator">|</span>
                </a>
              ) : (
                // Los elementos intermedios y el primero (si es un enlace)
                <a href={item.url} className="breadcrumbs__link">
                  {item.text}
                </a>
              )}
              {/* El ultimo elemento no lleva separador */}
              {!isFirstItem && !isLastItem && (
                <span className="breadcrumbs__link--separator">&gt;</span> // O '&vert;' para |
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
