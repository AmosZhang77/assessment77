import { render, type RenderOptions as RtlRenderOptions } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

const initialProductState = useProductStore.getState();
const initialCartState = useCartStore.getState();

export function resetStores(): void {
  useProductStore.setState(initialProductState, true);
  useCartStore.setState(initialCartState, true);
}

export interface RenderWithProvidersOptions extends Omit<RtlRenderOptions, 'wrapper'> {
  route?: string;
}

function AllProviders({
  children,
  route = '/products/P001',
}: {
  children: React.ReactNode;
  route?: string;
}) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <ConfigProvider>{children}</ConfigProvider>
    </MemoryRouter>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/products/P001', ...options }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AllProviders route={route}>{children}</AllProviders>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
