import type { FavoriteSectionProps } from "../../../../types/product";
import "./FavoriteSection.scss"


export const FavoriteSection = ({ condition, sold_quantity }: FavoriteSectionProps) => {
    return (
        <div className="favorite-section-container">
            <div className="favorite-section-container__status-and-favorites">
                <span className="favorite-section-container__condition">
                    {condition}
                </span>
                    {sold_quantity && sold_quantity > 0 && (
                <span className="favorite-section-container__quantity">
                    {' '}
                    | +{Math.floor(sold_quantity / 100) * 100} vendidos
                </span>
                )}
                <button className="favorite-section-container__like-button" aria-label="Añadir a favoritos">
                    <span className="favorite-section-container__like-icon"></span>
                </button>
            </div>
        </div>
    );
};