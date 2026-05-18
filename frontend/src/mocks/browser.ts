import { setupWorker } from 'msw/browser';
import { productHandlers } from './handlers/productHandlers';
import { cartHandlers } from './handlers/cartHandlers';

export const worker = setupWorker(...productHandlers, ...cartHandlers);
