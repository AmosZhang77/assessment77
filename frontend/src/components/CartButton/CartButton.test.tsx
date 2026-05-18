import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartButton from './CartButton';
import { renderWithProviders } from '../../tests/testUtils';

describe('CartButton', () => {
  it('shows add to cart label and triggers onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProviders(
      <CartButton disabled={false} loading={false} outOfStock={false} onClick={onClick} />
    );

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeEnabled();

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('shows out of stock label when unavailable', () => {
    renderWithProviders(
      <CartButton disabled={true} loading={false} outOfStock={true} onClick={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: /out of stock/i })).toBeDisabled();
  });
});
