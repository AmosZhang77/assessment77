import { ConfigProvider } from 'antd';
import AppRoutes from './routes';
import styles from './App.module.scss';
import './styles/global.scss';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
      }}
    >
      <header className={styles.appHeader}>
        <span className={styles.appHeaderLogo}>AerisShop</span>
      </header>
      <main className={styles.appMain}>
        <AppRoutes />
      </main>
    </ConfigProvider>
  );
}
