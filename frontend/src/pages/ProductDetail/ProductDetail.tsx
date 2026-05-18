import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Badge, Skeleton, Divider, message as antMessage } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import ProductImage from '../../components/ProductImage/ProductImage';
import VariantSelector from '../../components/VariantSelector/VariantSelector';
import QuantityControl from '../../components/QuantityControl/QuantityControl';
import StockBadge from '../../components/StockBadge/StockBadge';
import CartButton from '../../components/CartButton/CartButton';
import styles from './ProductDetail.module.scss';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const {
    product,
    loading,
    error,
    selectedVariants,
    currentSku,
    quantity,
    fetchProduct,
    setVariant,
    setQuantity,
  } = useProductStore();

  const { cartCount, status: cartStatus, errorMessage, addItem, resetStatus } = useCartStore();

  const [messageApi, contextHolder] = antMessage.useMessage();

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [fetchProduct, productId]);

  useEffect(() => {
    if (cartStatus === 'success') {
      messageApi.success('Added to cart successfully!');
      resetStatus();
    } else if (cartStatus === 'error' && errorMessage) {
      messageApi.error(errorMessage);
      resetStatus();
    }
  }, [cartStatus, errorMessage, messageApi, resetStatus]);

  const uniqueColors = product
    ? [...new Set(product.variants.map((v) => v.color))]
    : [];

  const uniqueSizes = product
    ? [...new Set(product.variants.map((v) => v.size))]
    : [];

  const handleAddToCart = useCallback(() => {
    if (!product || !currentSku) return;
    addItem({ productId: product.productId, skuId: currentSku.skuId, quantity });
  }, [product, currentSku, quantity, addItem]);

  const isOutOfStock = currentSku ? currentSku.stock === 0 : false;
  const isAddDisabled = isOutOfStock || cartStatus === 'loading' || !currentSku;

  if (!productId) {
    return (
      <div className={`${styles.productDetail} ${styles.productDetailError}`}>
        <Alert type="error" showIcon message="Product not found" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${styles.productDetail} ${styles.productDetailLoading}`}>
        <div className={styles.productDetailSkeleton}>
          <Skeleton.Image active style={{ width: '100%', height: 400 }} />
          <div className={styles.productDetailSkeletonInfo}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.productDetail} ${styles.productDetailError}`}>
        <Alert
          type="error"
          showIcon
          message="Failed to load product"
          description={error}
          action={
            <button className={styles.productDetailRetry} onClick={() => fetchProduct(productId)}>
              Retry
            </button>
          }
        />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className={styles.productDetail}>
      {contextHolder}

      <div className={styles.productDetailLayout}>
        <div className={styles.productDetailGallery}>
          <ProductImage images={product.images} productName={product.name} />
        </div>

        <div className={styles.productDetailInfo}>
          <h1 className={styles.productDetailName}>{product.name}</h1>

          {currentSku && (
            <div className={styles.productDetailPrice}>
              ${currentSku.price.toLocaleString()}
            </div>
          )}

          {currentSku && (
            <div className={styles.productDetailStock}>
              <StockBadge stock={currentSku.stock} />
            </div>
          )}

          <Divider />

          <div className={styles.productDetailVariants}>
            <VariantSelector
              label="Color"
              options={uniqueColors}
              selected={selectedVariants.color}
              onChange={(val) => setVariant('color', val)}
            />
            <VariantSelector
              label="Storage"
              options={uniqueSizes}
              selected={selectedVariants.size}
              onChange={(val) => setVariant('size', val)}
            />
          </div>

          <Divider />

          {currentSku && currentSku.stock > 0 && (
            <div className={styles.productDetailQuantity}>
              <span className={styles.productDetailQuantityLabel}>Quantity:</span>
              <QuantityControl
                quantity={quantity}
                max={currentSku.stock}
                onChange={setQuantity}
              />
            </div>
          )}

          <div className={styles.productDetailActions}>
            <CartButton
              disabled={isAddDisabled}
              loading={cartStatus === 'loading'}
              outOfStock={isOutOfStock}
              onClick={handleAddToCart}
            />
          </div>

          <div className={styles.productDetailDescription}>
            <h3>About this product</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.productDetailCartIndicator} aria-live="polite">
        <Badge count={cartCount} showZero color="#1677ff">
          <ShoppingCartOutlined className={styles.productDetailCartIcon} />
        </Badge>
        <span className={styles.productDetailCartLabel}>
          {cartCount === 0 ? 'Cart is empty' : `${cartCount} item${cartCount > 1 ? 's' : ''} in cart`}
        </span>
      </div>
    </div>
  );
}
