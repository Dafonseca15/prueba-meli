export interface Product {
    id: string;
    title: string;
    condition: string;
    sold_quantity: number;
    price: {
        currency: string;
        amount: number;
        decimals: number;
        original_amount?: number;
        installments?: {
            quantity: number;
            amount: number;
            rate?: number;
            text?: string;
        };
    };
    stock: number;
    pictures: string[];
    description: string;
    seller_info: {
        id: string;
        nickname: string;
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
    want_to_buy?: want_to_buy;
    share?: share;
}

export interface BreadCrumbsProps {
    items: Array<{
        text: string;
        url: string;
    }>;
}

export interface want_to_buy {
    text: string;
    url: string;
}

export interface share {
    title: string;
    options: Array<{
        name: string;
        icon: string;
        url: string;
    }>;
}