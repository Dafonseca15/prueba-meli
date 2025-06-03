import './ProductInterestRow.scss';

interface ProductInterestRowProps {
    title: string;
    items: Array<{
        text: string;
        url: string;
    }>;
}

export const ProductInterestRow:React.FC<ProductInterestRowProps> = ({
    title,
    items
}) => {
    
    return (
        <div className="interest-row-content">
            <span className="interest-row-content__title">
                {title}
            </span>
            <div className="interest-row-content__items">
                {items.map((item, index) => (
                    <div key={index}>
                        <a href={`/search?q=${(item.url)}`} className="interest-row-content__item-link">
                        {item.text}
                        </a>
                        {index < items.length - 1 && <span className="interest-row-content__separator" data-testid="item-separator"> - </span>}
                    </div>
                ))}

            </div>
        </div>
    )
}