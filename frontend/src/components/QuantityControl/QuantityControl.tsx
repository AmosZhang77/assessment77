import styles from './QuantityControl.module.scss';

interface QuantityControlProps {
  quantity: number;
  max: number;
  onChange: (qty: number) => void;
}

export default function QuantityControl({ quantity, max, onChange }: QuantityControlProps) {
  const canDecrease = quantity > 1;
  const canIncrease = quantity < max;

  return (
    <div className={styles.quantityControl} role="group" aria-label="Quantity selector">
      <button
        className={styles.quantityControlBtn}
        onClick={() => onChange(quantity - 1)}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
      >
        {'\u2212'}
      </button>
      <span className={styles.quantityControlValue} aria-live="polite">
        {quantity}
      </span>
      <button
        className={styles.quantityControlBtn}
        onClick={() => onChange(quantity + 1)}
        disabled={!canIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
      <span className={styles.quantityControlHint}>/ {max} available</span>
    </div>
  );
}
