import { useParams } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetail";
import '../assets/styles/ProductDetailPage.scss';
import { ProductInfoBlock } from "../components/ProductInfoBlock/ProductInfoBlock";


export const ProductDetailPage = () => {

    const { id } = useParams<{ id: string }>();
    const { product, loading, error } = useProductDetails(id || '');

    if (loading) {
        return <div>Cargando Producto...</div>;
    }
    if (error) {
        return <div>Error al cargar el producto: {error}</div>;
    }
    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-content-wapper">
                <ProductInfoBlock product={product} />
            </div>
        </div>
    );
}