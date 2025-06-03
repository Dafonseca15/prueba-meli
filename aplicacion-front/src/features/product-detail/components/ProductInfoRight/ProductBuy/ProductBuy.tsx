import { CustomButton } from "../../../../../components/CustomButton/CustomButton";
import { CustomLink } from "../../../../../components/CustomLink/CustomLink";
import { CustomText } from "../../../../../components/CustomText/CustomText";
import { CustomTitle } from "../../../../../components/CustomTitle/CustomTitle"
import './ProductBuy.scss';
import ReturnIcon from "../../../../../assets/images/ReturnIcon.png";
import ShieldIcon from "../../../../../assets/images/ShieldIcon.png";
import MedalIcon from "../../../../../assets/images/MedalIcon.png";
import type { BuyAndDeliveryProps } from "../../../types/product";

export const ProductBuy:React.FC<BuyAndDeliveryProps> = ({ buy_and_delivery, seller }) => {

    const { delivery, disponibility, actions, benefits } = buy_and_delivery;

    return (
        <div 
            className="product-buy-container"
            data-testid="product-buy-container"
            >
            {/**1. Datos de envio */}
            <CustomText as="span" bold={true} color="#00a650" size="md">
                {delivery.title} <span className="product-buy-container__text-bold">a todo el país</span></CustomText>
            <CustomText children={delivery.description} color="#0000008c" size="xs"/>
            {delivery.calculate_shipping && delivery.shipping_url && (
                <CustomLink children={delivery.calculate_shipping} href={delivery.shipping_url} size="xs"/>
            )}
            
            {/**2. Titulo aluciente a la disponibiliddad */}
            <CustomTitle children={disponibility.title} level="h3" size="2xl" bold="bold" marginBottom="1.5rem" marginTop="1.5rem"></CustomTitle>
            
            {/**3. Comprar o agregar producto */}
            {
                actions.map((action, index) => (
                    <CustomButton 
                        key={index} 
                        onClick={() => action.url && window.open(action.url, '_blank')} 
                        type={action.is_primary ? 'primary' : 'secondary'} 
                        size="sm" 
                        fullWidth
                        marginTop={index > 0 ? "0.5rem" : "0"}
                    >
                        {action.text}
                    </CustomButton>
                ))
            }

            {/**4. Datos vendedor */}
            <CustomText size="xs" marginTop="1.5rem">Vendido por <span className="product-buy-container__seller">{seller}</span></CustomText>
            
            {/**5. Beneficios */}
            {
                benefits?.map((benefit, index) => (
                    <div 
                        key={index} 
                        className="product-buy-container__benefits"
                        data-testid="product-buy-container__benefits-item"
                        >
                        <img 
                            className="product-buy-container__icon" 
                            src={benefit.icon.includes('return') ? ReturnIcon : benefit.icon.includes('shield') ? ShieldIcon : MedalIcon} alt="" 
                            />
                        <CustomText as="span" size="sm" color="#0000008c">
                            {benefit.text}
                            {benefit.description && ` ${benefit.description}`}
                        </CustomText>
                    </div>
                ))
            }
        </div>
    )
}