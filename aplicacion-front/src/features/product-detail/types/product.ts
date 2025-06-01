export interface Product {
    id: string;
    title: string;
    condition: string;
    sold_quantity: number;
    purchase: {
        currency: string;
        amount: number;
        decimals: number;
        original_amount?: number;
        discount_percentage?: number;
        installments?: {
            quantity: number;
            amount: number;
            rate?: number;
            text?: string;
        };
        promotion: {
            discount: number;
            tc_agreement: string;
        }
    };
    stock: number;
    pictures: string[];
    description: string;
    seller_info: {
        id: string;
        nickname: string;
        visitUs: string;
        url: string;
        reputation_level: 'gold' | 'silver' | 'bronze' | 'none';
        sales_completed: number;
    };
    shipping: {
        free_shipping: boolean;
        logistic_type: string;
        delivery_time?: string;
    };
    highlights?: string[];
    product_features?: Array<{
        type: string;
        text: string;
        icon?: string;
    }>;
    color_options?: Array<{
        name: string;
        hex?: string;
        picture?: string;
    }>;
    interest?: {
        title: string;
        items: Array<{
            text: string;
            url: string;
        }>;
    };
    breadcrumbs?: BreadCrumbsProps;
    badge_info?: {
        text: string;
        category_position: string;
        category_text?: string;
        category_url?: string;
    };
    rating?: {
        average: number;
        total_reviews: number;
    };
    color_selector?: [
        {
            name: string;
            thumbnailUrl?: string;
            value?: string;
            selected?: boolean;
        }
    ],
    keyInfo?: {
        title: string;
        items: string[];
    };
}

export interface keyInfoProps {
    keyInfo: {
        title: string;
        items: string[];
    };
}

export interface ColorsSelectorProps {
    color_selector: Array<{
        name: string;
        thumbnailUrl?: string;
        value?: string;
        selected?: boolean;
    }>;
}

export interface ProductDetailProps {
    purchase: {
        currency: string;
        amount: number;
        decimals: number;
        original_amount?: number;
        discount_percentage?: number;
        installments?: {
            quantity: number;
            amount: number;
            rate?: number;
            text?: string;
        };
        promotion: {
            discount: number;
            tc_agreement: string;
        }
    }
}

export interface RatingProps {
    rating: {
        average: number;
        total_reviews: number;
    }
}

export interface badgeInfoProps {
    badge_info: {
        text: string;
        category_position: string;
        category_text?: string;
        category_url?: string;
    };
}

export interface sellerInfoProps {
    seller_info: {
        id: string;
        nickname: string;
        visitUs: string;
        url: string;
        reputation_level: 'gold' | 'silver' | 'bronze' | 'none';
        sales_completed: number;
    };
}

export interface BreadCrumbsProps {
    items: Array<{
        text: string;
        url: string;
    }>;
    more_actions?: breadcrumbsMoreActions | null;
}

export interface breadcrumbsMoreActions {
    more_actions: Array<{
        text: string;
        url?: string | null;
        options?: Array<{
            name: string;
            icon: string;
            url: string;
        }> | null;
    }>;
}

export interface FavoriteSectionProps {
    condition: string;
    sold_quantity: number;
}