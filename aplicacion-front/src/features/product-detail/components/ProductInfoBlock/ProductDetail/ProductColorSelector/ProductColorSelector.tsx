import { useState } from 'react';
import type { ColorsSelectorProps } from '../../../../types/product';
import './ProductColorSelector.scss';
import { useNavigate } from 'react-router-dom';
import { CustomText } from '../../../../../../components/CustomText/CustomText';

export const ProductColorSelector: React.FC<ColorsSelectorProps> = ({ color_selector }) => {
  const [nameColor, setNameColor] = useState<string>(
    color_selector.find((option) => option.selected)?.name || 'Selecciona un color'
  );
  const navigate = useNavigate();

  return (
    <div className="product-color-selector" data-testid="product-color-selector">
      <CustomText as="span" size="sm" color="#0000008c" className="product-color-selector__label">
        Color:{' '}
        <span
          className="product-color-selector__selected-name"
          data-testid="product-color-selector__selected-name"
        >
          {nameColor}
        </span>
      </CustomText>
      <div
        className="product-color-selector__options"
        data-testid="product-color-selector__options"
      >
        {color_selector.map((option, index) => (
          <button
            key={index}
            className={`product-color-selector__thumbnail ${option.selected ? 'product-color-selector__thumbnail--selected' : ''}`}
            onMouseEnter={() => setNameColor(option.name)}
            onClick={() => navigate(`${option.thumbnailUrl}`)}
            aria-label={`Seleccionar color ${option.name}`}
          >
            <img src={option.thumbnailUrl} alt={option.name} />
          </button>
        ))}
      </div>
    </div>
  );
};
