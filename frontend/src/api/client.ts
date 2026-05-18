import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const REQUEST_TIMEOUT = 10_000;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* ─── Request interceptor ─────────────────────────────────────────── */
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    if (import.meta.env.DEV) {
      console.debug(`[API →] ${config.method?.toUpperCase()} ${config.url}`, config.data ?? '');
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* ─── Response interceptor ────────────────────────────────────────── */
client.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.debug(`[API ←] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as Record<string, unknown> | undefined;
    const serverMessage = typeof data?.message === 'string' ? data.message : null;

    if (status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    const message =
      serverMessage ??
      (status === 404
        ? 'Resource not found.'
        : status === 500
          ? 'Server error. Please try again later.'
          : error.message || 'An unexpected error occurred.');

    return Promise.reject(new Error(message));
  }
);

export default client;
