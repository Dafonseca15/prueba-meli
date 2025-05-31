import { useState } from 'react';
import './ProductImageGallery.scss';

interface ProductImageGalleryProps {
    pictures: string[];
    title: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ pictures, title }) => {

    const [mainImage, setMainImage] = useState<string>(pictures[0]);

    if (!pictures || pictures.length === 0) {
        return <div className="no-images-placeholder">No images available</div>;
    }

    return (
        <div className='product-images-section'>
            <div className='product-thumbnail-gallery'>
                {pictures.map((pic, index) => (
                    <img
                        src={mainImage}
                        alt={title}
                        className={`thumbnail ${mainImage === pic ? 'active' : ''}`}
                        key={index}
                        onClick={() => setMainImage(pic)}
                    />
                ))}
            </div>
            <div >
                <img src={mainImage} alt={title} className='main-image'/>
            </div>
        </div>
    );
}