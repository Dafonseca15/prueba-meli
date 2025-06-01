import type { keyInfoProps } from "../../../../types/product";
import "./ProductInfoKey.scss"

export const ProdutInfoKey: React.FC<keyInfoProps> = ({ keyInfo }) => {

    const { title, items } = keyInfo;
    
    return (
        <div className="product-info-key">
            <p className="product-info-key__title">{title}</p>
            <ul className="product-info-key__list">
                {
                    items.map((item, index) => (
                    
                        index < 3 && (
                            <li key={index} className="product-info-key__item">
                                {item}
                            </li>
                        )    
                ))}
            </ul>
            {
                items.length > 3 && (
                    <a href="#" className="product-info-key__characteristics-link">
                        Ver características
                    </a>
                )
            }
        </div>
    );
}