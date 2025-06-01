import React from "react"
import type { BreadCrumbsProps } from "../../features/product-detail/types/product"
import './Breadcrumbs.scss';
 

export const Breadcrumbs:React.FC<BreadCrumbsProps> = ({ items }) => {

    if (!items || items.length === 0) {
        return null;
    }
    
    return (
        <nav className="breadcrumbs" aria-label="breadcrumb">
            <ol className="breadcrumbs__list">
                {items.map((item, index) => (
                <li key={index} className="breadcrumbs__item">
                    {
                        index === 0 ? (
                            <React.Fragment>
                            {/* Si es el primer elemento, muestra un texto de "Volver" */}
                            {/* Si no, muestra un enlace */}
                                <span className="breadcrumbs__link">{item.text}</span>
                                <span className="breadcrumbs__separator">|</span>
                            </React.Fragment>
                            ) : (
                            <React.Fragment>
                                {/* Si es el primer elemento, muestra un texto de "Volver" */}
                                {/* Si no, muestra un enlace */}
                                <a href={item.url} className="breadcrumbs__link">
                                    {item.text}
                                </a>
                                {index < items.length - 1 && <span className="breadcrumbs__separator">&gt;</span>}
                            </React.Fragment>
                            
                        )
                    }
                </li>
                ))}
            </ol>
        </nav>
    )
}