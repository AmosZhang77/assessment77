import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VariantSelector from './VariantSelector';
import { renderWithProviders } from '../../tests/testUtils';

describe('VariantSelector', () => {
  it('renders options and calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProviders(
      <VariantSelector
        label="Color"
        options={['Midnight Black', 'Pearl White']}
        selected="Midnight Black"
        onChange={onChange}
      />
    );

    expect(screen.getByText('Color:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Midnight Black' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    await user.click(screen.getByRole('button', { name: 'Pearl White' }));
    expect(onChange).toHaveBeenCalledWith('Pearl White');
  });
});
