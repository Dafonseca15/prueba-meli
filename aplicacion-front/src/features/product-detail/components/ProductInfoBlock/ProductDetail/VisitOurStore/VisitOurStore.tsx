import { CustomLink } from "../../../../../../components/CustomLink/CustomLink";
import type { sellerInfoProps } from "../../../../types/product";
import "./VisitOurStore.scss";

export const VisitOurStore:React.FC<sellerInfoProps> = ({ seller_info }) => {

    return (
        <div 
            className="visit-our-store"
            data-testid="visit-our-store"
            >
            <CustomLink href="#" size="xs" className="visit-our-store__link">
                <img className="logo" src="https://http2.mlstatic.com/D_NQ_NP_865786-MLA83101123836_032025-G.jpg" alt="" />
                {seller_info.visitUs} <span className="visit-our-store__link__verified"></span>
            </CustomLink>
        </div>
    )
}