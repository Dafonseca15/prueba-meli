import { CustomLink } from "../../../../../../components/CustomLink/CustomLink";
import { CustomText } from "../../../../../../components/CustomText/CustomText";
import { formatPrice } from "../../../../../../utils/utils";
import type { ProductDetailProps } from "../../../../types/product"
import "./ProductPurchaseDetails.scss"

export const ProductPurchaseDetails:React.FC<ProductDetailProps> = ({purchase}) => {

    const { 
        currency,
        amount,
        decimals,
        original_amount,
        installments,
        discount_percentage,
        promotion
    } = purchase;

    return (
        <div className="product-purchase-details">
            {original_amount && original_amount > amount && (
                <p className="product-purchase-details__original-price">
                {formatPrice(original_amount, currency, decimals)}
                </p>
            )}

            <div className="product-purchase-details__current-price-row">
                <h2 className="product-purchase-details__current-price">
                {formatPrice(amount, currency, decimals)}
                </h2>
                {discount_percentage && discount_percentage > 0 && (
                <span className="product-purchase-details__discount-percentage">
                    {discount_percentage}% OFF
                </span>
                )}
            </div>

            {installments && installments.quantity > 0 && (
                <CustomText 
                    as="p" 
                    className="product-purchase-details__installments"
                    size="md"
                    marginBottom="1rem"
                    color="#343434"
                >
                    en {' '} 
                    <span className="product-purchase-details__installments-amount">
                        {installments.quantity} cuotas de{' '} 
                        <span className="product-purchase-details__installments-amount--value">
                            {formatPrice(installments.amount, currency, decimals)}
                        </span> {' '} con {' '} 
                        <span className="product-purchase-details__installments-amount--value">
                            {installments.rate}
                        </span> % interés
                    </span>{' '}
                </CustomText>
            )}

            {
                promotion && promotion.tc_agreement && (
                    <div className="product-purchase-details__tc-agreement">
                        <p className="product-purchase-details__tc-agreement__text">
                            {promotion.discount}% OFF {' '} {promotion.tc_agreement}
                        </p>
                    </div>
                )
            }

            <CustomLink children="Ver los medios de pago" href="#" size="xs"/>
        </div>
    )
}