import { useState } from 'react';
import './ProductImageGallery.scss';

interface ProductImageGalleryProps {
  pictures: string[] | null | undefined;
  title: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ pictures, title }) => {
  const [mainImage, setMainImage] = useState<string>(pictures?.[0] || '');

  if (!pictures || pictures.length === 0) {
    return (
      <div className="no-images-placeholder" data-testid="no-images-placeholder">
        No images available
      </div>
    );
  }

  return (
    <div className="product-images-section" data-testid="product-images-section">
      <div className="product-thumbnail-gallery" data-testid="product-thumbnail-gallery">
        {pictures.map((pic, index) => (
          <img
            src={pic}
            alt={title}
            className={`thumbnail ${mainImage === pic ? 'active' : ''}`}
            key={index}
            onMouseEnter={() => setMainImage(pic)}
            data-testid={`thumbnail-image-element-${index}`}
          />
        ))}
      </div>
      <div className="product-main-image" data-testid="product-main-image">
        <img src={mainImage} alt={title} className="main-image" data-testid="main-image-element" />
      </div>
    </div>
  );
};
