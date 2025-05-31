import { useState, useEffect } from 'react';
import { fetchProductDetails } from '../api/productApi';
import { type  Product } from '../types/product';

interface useProductDetailsProps {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook para la gestión del estado de carga, error y datos de un producto.
 * @param productId El ID del producto a cargar.
 * @returns Un objeto con el producto, el estado de carga y cualquier error.
 */
export const useProductDetails = (productId: string): useProductDetailsProps => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!productId) {
            setError('El ID del producto es requerido');
            setLoading(false);
            return;
        }

        setLoading(true); // Siempre que cambie el ID, volvemos a cargar
        setError(null); // Limpiamos errores anteriores
        
        const getProduct = async () => {
            try {
                const productData = await fetchProductDetails(productId);
                setProduct(productData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrio un error desconocido');
                }
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [productId]);

    return { product, loading, error };
}