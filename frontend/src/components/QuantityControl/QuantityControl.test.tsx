import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantityControl from './QuantityControl';
import { renderWithProviders } from '../../tests/testUtils';

describe('QuantityControl', () => {
  it('increases and decreases quantity within bounds', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(<QuantityControl quantity={2} max={5} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables buttons at min and max', () => {
    const onChange = vi.fn();

    const { rerender } = renderWithProviders(
      <QuantityControl quantity={1} max={5} onChange={onChange} />
    );

    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase quantity' })).toBeEnabled();

    rerender(<QuantityControl quantity={5} max={5} onChange={onChange} />);

    expect(screen.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
    expect(screen.getByText('/ 5 available')).toBeInTheDocument();
  });
});
