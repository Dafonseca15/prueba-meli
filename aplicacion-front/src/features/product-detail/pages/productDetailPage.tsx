import { useParams } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetail";


export const ProductDetailPage = () => {

    const { id } = useParams<{ id: string }>();
    const { product, loading, error } = useProductDetails(id || '');

    if (loading) {
        return <div>Cargando Producto...</div>;
    }


    return (
        <div>
            Hola DIegol
        </div>
    );
}