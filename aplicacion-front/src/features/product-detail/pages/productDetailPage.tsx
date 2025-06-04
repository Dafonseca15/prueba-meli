import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetail';
import '../assets/styles/ProductDetailPage.scss';
import { ProductInfoBlock } from '../components/ProductInfoBlock/ProductInfoBlock';
import { ProductInterestRow } from '../../../components/ProductInterestRow/ProductInterestRow';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { SellShareActions } from '../../../components/sellShareActions/sellShareActions';
import { ProductInfoRight } from '../components/ProductInfoRight/ProductInfoRight';

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
    <div className="product-detail-page" data-testid="product-detail-page">
      {/* 1. Fila - Tambien te puede interesar */}
      {product.interest && product.interest.items.length > 0 && (
        <ProductInterestRow title={product.interest?.title} items={product.interest?.items} />
      )}
      {/* 2. Contenedor para Breadcumbs y Actions */}
      <div className="product-breadcrumbs-actions-wrapper">
        {product?.breadcrumbs && product?.breadcrumbs?.items?.length > 0 && (
          <Breadcrumbs items={product.breadcrumbs.items} />
        )}
        {/* Acciones de venta y compartición */}
        {product?.breadcrumbs?.more_actions &&
          product?.breadcrumbs?.more_actions.more_actions.length > 0 && (
            <SellShareActions more_actions={product.breadcrumbs.more_actions.more_actions} />
          )}
      </div>
      {/*3. Contenido principal del producto  */}
      <div className="product-content-wrapper">
        <ProductInfoBlock product={product} />
        <ProductInfoRight product={product} />
      </div>
    </div>
  );
};
