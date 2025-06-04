import type { Product } from '../../../types/product';
import { CustomTitle } from '../../../../../components/CustomTitle/CustomTitle';
import { VisitOurStore } from './VisitOurStore/VisitOurStore';
import { FavoriteSection } from './FavoriteSection/FavoriteSection';
import { BadgeCategory } from './BadgeCategory/BadgeCategory';
import { Rating } from '../../../../../components/Rating/Rating';
import { ProductPurchaseDetails } from './ProductPurchaseDetails/ProductPurchaseDetails';
import { ProductColorSelector } from './ProductColorSelector/ProductColorSelector';
import { ProductInfoKey } from './ProductInfoKey/ProductInfoKey';

interface ProductInfoBlockProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductInfoBlockProps> = ({ product }) => {
  return (
    <div className="product-info" data-testid="product-info">
      {product.seller_info && <VisitOurStore seller_info={product.seller_info} />}

      {product.condition && product.sold_quantity && (
        <FavoriteSection condition={product.condition} sold_quantity={product.sold_quantity} />
      )}

      {product.badge_info && product.badge_info?.category_url && (
        <BadgeCategory badge_info={product.badge_info} />
      )}

      {product.title && (
        <CustomTitle
          children={product.title}
          level="h3"
          size="2xl"
          bold="bold"
          marginBottom="0.5rem"
        />
      )}

      {product.rating && <Rating rating={product.rating} />}

      {product.purchase && <ProductPurchaseDetails purchase={product.purchase} />}

      {product.color_selector && <ProductColorSelector color_selector={product.color_selector} />}

      {product.keyInfo && <ProductInfoKey keyInfo={product.keyInfo} />}
    </div>
  );
};
