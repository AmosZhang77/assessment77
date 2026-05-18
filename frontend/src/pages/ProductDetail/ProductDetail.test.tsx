import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { renderWithProviders } from '../../tests/testUtils';
import { server } from '../../tests/server';

function renderProductDetail() {
  return renderWithProviders(
    <Routes>
      <Route path="/products/:productId" element={<ProductDetail />} />
    </Routes>
  );
}

describe('ProductDetail', () => {
  it('loads and displays product information', async () => {
    renderProductDetail();

    expect(await screen.findByRole('heading', { name: 'AerisPhone Pro Max' })).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getByText(/In Stock \(15 available\)/)).toBeInTheDocument();
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('updates price when storage variant changes', async () => {
    const user = userEvent.setup();
    renderProductDetail();

    await screen.findByRole('heading', { name: 'AerisPhone Pro Max' });

    await user.click(screen.getByRole('button', { name: '256GB' }));

    await waitFor(() => {
      expect(screen.getByText('$1,199')).toBeInTheDocument();
    });
  });

  it('adds item to cart and updates cart indicator', async () => {
    const user = userEvent.setup();
    renderProductDetail();

    await screen.findByRole('heading', { name: 'AerisPhone Pro Max' });

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(await screen.findByText('1 item in cart')).toBeInTheDocument();
  });

  it('shows out of stock state for unavailable SKU', async () => {
    const user = userEvent.setup();
    renderProductDetail();

    await screen.findByRole('heading', { name: 'AerisPhone Pro Max' });

    await user.click(screen.getByRole('button', { name: '512GB' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /out of stock/i })).toBeDisabled();
    });
    expect(screen.queryByLabelText('Quantity selector')).not.toBeInTheDocument();
  });

  it('shows error and retries when product fetch fails', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('/api/product/:productId', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    );

    renderProductDetail();

    expect(await screen.findByText('Failed to load product')).toBeInTheDocument();

    server.resetHandlers();

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(
      await screen.findByRole('heading', { name: 'AerisPhone Pro Max' })
    ).toBeInTheDocument();
  });
});
