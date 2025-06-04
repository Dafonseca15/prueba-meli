import { CustomText } from '../../../../../../components/CustomText/CustomText';
import type { FavoriteSectionProps } from '../../../../types/product';
import './FavoriteSection.scss';

export const FavoriteSection = ({ condition, sold_quantity }: FavoriteSectionProps) => {
  return (
    <div className="favorite-section-container" data-testid="favorite-section-container">
      <div
        className="favorite-section-container__status-and-favorites"
        data-testid="favorite-section-container__status-and-favorites"
      >
        <CustomText size="xs" color="#0000008c" className="favorite-section-container__condition">
          {condition} | {`${Math.floor(sold_quantity / 100) * 100} vendidos`}
        </CustomText>
        <button className="favorite-section-container__like-button" aria-label="Añadir a favoritos">
          <span className="favorite-section-container__like-icon"></span>
        </button>
      </div>
    </div>
  );
};
