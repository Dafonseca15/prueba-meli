import React from 'react';
import type { breadcrumbsMoreActions } from '../../features/product-detail/types/product';
import './sellShareActions.scss' 

export const SellShareActions:React.FC<breadcrumbsMoreActions> = ({ more_actions }) => {
    
    return (
        <div className="sell-share-actions">
            {
                more_actions.map((action, index) => (
                    <React.Fragment key={index}>
                        {
                            action.url ? (
                            <a href={action.url} className={`sell-share-actions__link ${index === 0 ? 'separator' : ''}`}>
                                {action.text}
                            </a>
                            ) : (
                                <span className={`sell-share-actions__link ${index === 0 ? 'separator' : ''}`}>
                                    {action.text}
                                </span>
                            )
                        }
                    </React.Fragment>
                ) )
            }
        </div>
    );
}