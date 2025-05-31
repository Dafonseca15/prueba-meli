import type { Product } from "../../types/product"
import { ProductDetail } from "./ProductDetail/ProductDetail";
import { ProductImageGallery } from "./ProductImageGallery/ProductImageGallery";
import './ProductInfoBlock.scss'

interface ProductInfoBlockProps {
    product: Product;
}

export const ProductInfoBlock: React.FC<ProductInfoBlockProps> = ({ product }) => {
    return (
        <div className="product-info-section">
            <ProductImageGallery pictures={product.pictures} title={product.title} />
            <ProductDetail product={product} />
        </div>
    )
}