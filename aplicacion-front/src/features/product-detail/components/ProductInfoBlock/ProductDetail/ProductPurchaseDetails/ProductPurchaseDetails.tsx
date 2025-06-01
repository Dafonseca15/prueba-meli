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
                <p className="product-purchase-details__installments">
                en {installments.quantity} cuotas de{' '}
                <span className="product-purchase-details__installments-amount">
                    {formatPrice(installments.amount, currency, decimals)}
                </span>{' '}
                con <span className="product-purchase-details__percentage">{installments.rate}</span>% interés
                </p>
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

            <a href="#" className="product-purchase-details__payment-methods-link">
                Ver los medios de pago
            </a>
        </div>
    )
}