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
}