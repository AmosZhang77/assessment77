How to use

A 
```shell
cd A
python solution.py
```

B
```shell
cd B
python solution.py
```

C

## frontend

### a. How to run your code

**Prerequisites:** [Node.js](https://nodejs.org/) (LTS recommended) and npm.

```shell
cd frontend
npm install
npm run dev
```

Open the URL printed in the terminal (Vite defaults to `http://localhost:5173`). The app redirects `/` to `/products/P001`.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (MSW mocks API requests) |

| `npm test` | Run unit tests once (Vitest) |
| `npm run test:ui` | Launch the Vitest UI test interface |

### b. Assumptions made

- **Scope:** Single product-detail page at `/products/:productId`. `/` redirects to product `P001`.
- **API contract:** `GET /api/product/:productId` returns a product; `POST /api/cart` accepts `{ productId, skuId, quantity }` and returns `{ success, cartCount? }` or an error `{ message }`.
- **Local development:** No backend is required. [MSW](https://mswjs.io/) intercepts `/api/*` in dev with ~800 ms latency. Only `P001` exists in mock data; other IDs return 404. Add-to-cart uses in-memory cart state and randomly fails ~30% of the time (500) to exercise error handling.
- **Product model:** A product has `productId`, `name`, `description`, `images`, and `variants`. Each variant has `skuId`, `color`, `size` (shown as “Storage” in the UI), `price`, and `stock`. SKU is resolved by matching both color and size.
- **Variant UX:** On load, the first variant is pre-selected. Quantity is clamped between 1 and current SKU stock. Out-of-stock SKUs disable add-to-cart.
- **Auth:** Optional `access_token` in `localStorage` is sent as `Bearer` if present; 401 responses clear the token and redirect to `/login` (login page not implemented in this app).
- **Stack:** React 19, TypeScript, Vite, React Router, Zustand, Ant Design, Axios, Sass CSS modules.