import type { RatingProps } from "../../features/product-detail/types/product"
import "./Rating.scss"

export const Rating:React.FC<RatingProps> = ({rating:{ average, total_reviews}}) => {

    const renderStars = () => {
        const fullStars = Math.floor(average);
        const hasHalfStar = total_reviews % 1 >= 0.5; // Si la parte decimal es .5 o más
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
        const stars = [];
    
        // Estrellas completas
        for (let i = 0; i < fullStars; i++) {
          stars.push(<span key={`full-${i}`} className="rating__star rating__star--full"></span>);
        }
    
        // Media estrella (si aplica)
        if (hasHalfStar) {
          stars.push(<span key="half" className="rating__star rating__star--half"></span>);
        }
    
        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
          stars.push(<span key={`empty-${i}`} className="rating__star rating__star--empty"></span>);
        }
    
        return stars;
    };
    
    return (
        <div className="rating__container">
            <span className="rating__average">{average.toFixed(1)}</span>
            <div className="rating__stars">
                {renderStars()}
            </div>
            <span className="rating__count">({total_reviews})</span>
        </div>
    )
}