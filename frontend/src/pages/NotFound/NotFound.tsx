import { Link } from 'react-router-dom';
import { Result } from 'antd';
import { DEFAULT_PRODUCT_ID } from '../../routes';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={`/products/${DEFAULT_PRODUCT_ID}`}>Back to product</Link>
      }
    />
  );
}
