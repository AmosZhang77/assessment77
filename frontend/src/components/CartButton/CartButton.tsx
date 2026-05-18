import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './CartButton.module.scss';

interface CartButtonProps {
  disabled: boolean;
  loading: boolean;
  outOfStock: boolean;
  onClick: () => void;
}

export default function CartButton({
  disabled,
  loading,
  outOfStock,
  onClick,
}: CartButtonProps) {
  const label = outOfStock ? 'Out of Stock' : 'Add to Cart';

  return (
    <Button
      type="primary"
      size="large"
      icon={<ShoppingCartOutlined />}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      className={styles.cartButton}
      block
    >
      {label}
    </Button>
  );
}
