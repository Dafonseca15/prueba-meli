import type { sellerInfoProps } from "../../../../types/product";
import "./VisitOurStore.scss";

export const VisitOurStore:React.FC<sellerInfoProps> = ({ seller_info }) => {

    return (
        <div className="visit-our-store">
            <a className="visit-our-store__link" href="#"> 
                <img className="logo" src="https://http2.mlstatic.com/D_NQ_NP_865786-MLA83101123836_032025-G.jpg" alt="" />
                {seller_info.visitUs} <span className="visit-our-store__link__verified"></span></a>
        </div>
    )
}