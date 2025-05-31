export interface Product {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
        installments?: {
            quantity: number;
            amount: number;
        };
    };
    condition: string;
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
        logistic_type: 'fulfillment' | 'drop_off' | 'pickup';
    };
    highlights?: string[];
}