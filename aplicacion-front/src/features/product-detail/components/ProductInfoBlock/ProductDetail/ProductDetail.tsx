import type React from "react";
import type { Product } from "../../../types/product";
import { formatPrice } from "../../../../../utils/utils";
import { calculateDiscount, discountPercentage } from "../../../utils/utils";
import { CustomTitle } from "../../../../../components/CustomTitle/CustomTitle";
import { VisitOurStore } from "./VisitOurStore/VisitOurStore";
import { FavoriteSection } from "./FavoriteSection/FavoriteSection";
import { BadgeCategory } from "./BadgeCategory/BadgeCategory";
import { Rating } from "../../../../../components/Rating/Rating";

interface ProductInfoBlockProps {
    product: Product;
}

export const ProductDetail: React.FC<ProductInfoBlockProps> = ( { product} ) => {

    const price = formatPrice(product.price.amount, product.price.currency, product.price.decimals);
    const discount = calculateDiscount(product.price.original_amount || 0, product.price.amount);
    const discount_percentage = discountPercentage(product.price.original_amount || 0, product.price.amount);

    return (
        <div className="product-info">
            {product.seller_info && <VisitOurStore seller_info={product.seller_info}/>}
            {product.condition && product.sold_quantity && <FavoriteSection condition={product.condition} sold_quantity={product.sold_quantity}/>}
            {product.badge_info && <BadgeCategory badge_info={product.badge_info} />}
            {product.title && <CustomTitle children={product.title} level="h3" size="2xl" bold="bold" marginBottom="0.5rem" />}
            {product.rating && <Rating rating={product.rating}/>}
        </div>
    )
}