import type { Product } from '../../types/product';
import { ProductBuy } from './ProductBuy/ProductBuy';

interface ProductInfoRightProps {
  product: Product;
}

export const ProductInfoRight: React.FC<ProductInfoRightProps> = ({ product }) => {
  return (
    <div>
      <ProductBuy
        buy_and_delivery={product.buy_and_delivery}
        seller={product.seller_info.nickname}
      />
    </div>
  );
};
