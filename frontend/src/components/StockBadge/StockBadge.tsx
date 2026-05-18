import styles from './StockBadge.module.scss';

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return <span className={`${styles.stockBadge} ${styles.stockBadgeOut}`}>Out of Stock</span>;
  }
  if (stock <= 5) {
    return (
      <span className={`${styles.stockBadge} ${styles.stockBadgeLow}`}>
        Low Stock — {stock} left
      </span>
    );
  }
  return (
    <span className={`${styles.stockBadge} ${styles.stockBadgeIn}`}>
      In Stock ({stock} available)
    </span>
  );
}
