import { useState } from "react";
import type { ColorsSelectorProps } from "../../../../types/product"
import "./ProductColorSelector.scss"
import { useNavigate } from "react-router-dom";

export const ProductColorSelectro:React.FC<ColorsSelectorProps> = ({color_selector}) => {

    const [nameColor, setNameColor] = useState<string>(color_selector.find(option => option.selected)?.name || 'Selecciona un color');
    const navigate = useNavigate();

    return (
        <div className="product-color-selector">
            <p className="product-color-selector__label">
                Color: <span className="product-color-selector__selected-name">{nameColor}</span>
            </p>
            <div className="product-color-selector__options">
                {color_selector.map((option, index) => (
                <button
                    key={index}
                    className={`product-color-selector__thumbnail ${option.selected ? 'product-color-selector__thumbnail--selected' : ''}`}
                    onMouseEnter={ () => setNameColor(option.name) }
                    onClick={() => navigate(`/product/${option.thumbnailUrl}`)}
                    aria-label={`Seleccionar color ${option.name}`}
                >
                    <img src={option.thumbnailUrl} alt={option.name} />
                </button>
                ))}
            </div>
        </div>
    )
}