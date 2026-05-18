import { useState } from 'react';
import { Modal } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  images: string[];
  productName: string;
}

export default function ProductImage({ images, productName }: ProductImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className={styles.productImage}>
      <div
        className={styles.productImageMain}
        onClick={() => setPreviewOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Click to enlarge image"
        onKeyDown={(e) => e.key === 'Enter' && setPreviewOpen(true)}
      >
        <img
          src={images[activeIndex]}
          alt={`${productName} - view ${activeIndex + 1}`}
          className={styles.productImageMainImg}
        />
        <div className={styles.productImageZoomHint}>
          <ZoomInOutlined />
        </div>
      </div>

      {images.length > 1 && (
        <div className={styles.productImageThumbnails}>
          {images.map((src, idx) => (
            <button
              key={idx}
              className={`${styles.productImageThumb} ${
                idx === activeIndex ? styles.productImageThumbActive : ''
              }`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
            >
              <img src={src} alt={`thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
        width="auto"
        className={styles.productImagePreviewModal}
        styles={{ body: { padding: 0, lineHeight: 0 } }}
      >
        <div className={styles.productImagePreviewWrap}>
          <img
            src={images[activeIndex]}
            alt={`${productName} - enlarged view ${activeIndex + 1}`}
            className={styles.productImagePreviewImg}
          />
          {images.length > 1 && (
            <div className={styles.productImagePreviewNav}>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.productImagePreviewDot} ${
                    idx === activeIndex ? styles.productImagePreviewDotActive : ''
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
