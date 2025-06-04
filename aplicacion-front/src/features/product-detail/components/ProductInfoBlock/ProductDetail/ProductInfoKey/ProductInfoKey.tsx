import { CustomLink } from '../../../../../../components/CustomLink/CustomLink';
import { CustomText } from '../../../../../../components/CustomText/CustomText';
import type { keyInfoProps } from '../../../../types/product';
import './ProductInfoKey.scss';

export const ProductInfoKey: React.FC<keyInfoProps> = ({ keyInfo }) => {
  const { title, items } = keyInfo;

  return (
    <div className="product-info-key" data-testid="product-info-key">
      <CustomText children={title} as="span" size="sm" bold color="#343434" />
      <ul className="product-info-key__list" data-testid="product-info-key__list">
        {items.map(
          (item, index) =>
            index < 3 && (
              <li
                key={index}
                className="product-info-key__item"
                data-testid="product-info-key__item"
              >
                {item}
              </li>
            )
        )}
      </ul>
      {items.length > 3 && <CustomLink children="Ver características" href="#" size="xs" />}
    </div>
  );
};
