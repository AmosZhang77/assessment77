import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import StockBadge from './StockBadge';
import { renderWithProviders } from '../../tests/testUtils';

describe('StockBadge', () => {
  it('shows out of stock message', () => {
    renderWithProviders(<StockBadge stock={0} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('shows low stock warning', () => {
    renderWithProviders(<StockBadge stock={3} />);
    expect(screen.getByText('Low Stock — 3 left')).toBeInTheDocument();
  });

  it('shows in stock message', () => {
    renderWithProviders(<StockBadge stock={10} />);
    expect(screen.getByText('In Stock (10 available)')).toBeInTheDocument();
  });
});
