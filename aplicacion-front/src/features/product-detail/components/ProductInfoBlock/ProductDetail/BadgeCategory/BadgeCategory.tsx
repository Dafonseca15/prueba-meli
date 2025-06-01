import type { badgeInfoProps } from "../../../../types/product"
import "./BadgeCategory.scss"

export const BadgeCategory:React.FC<badgeInfoProps> = ({ badge_info: { text, category_position, category_text, category_url }    
}) => {

    return (
        <div className="badge-category-container">
            <span className="badge-category-container__badge">{text}</span>
            <a href={category_url} className="badge-category-container__link">
                <span className="badge-category-container__category">
                    {category_position}
                </span>
                <span className="badge-category-container__text">
                    {category_text}
                </span>
            </a>
        </div>
    )
}