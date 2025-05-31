import type React from "react";
import type { Product } from "../../../types/product";
import { formatPrice } from "../../../../../utils/utils";
import { calculateDiscount, discountPercentage } from "../../../utils/utils";
import { CustomTitle } from "../../../../../components/CustomTitle/CustomTitle";

interface ProductInfoBlockProps {
    product: Product;
}

export const ProductDetail: React.FC<ProductInfoBlockProps> = ( { product} ) => {

    const price = formatPrice(product.price.amount, product.price.currency, product.price.decimals);
    const discount = calculateDiscount(product.price.original_amount || 0, product.price.amount);
    const discount_percentage = discountPercentage(product.price.original_amount || 0, product.price.amount);

    return (
        <div className="product-info">
            <CustomTitle children={product.title} level="h1" size="2xl" bold="bold" marginBottom="0.5rem" />
        </div>
    )
}