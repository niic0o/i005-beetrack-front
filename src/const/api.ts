export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

console.log(import.meta.env.VITE_API_BASE_URL);

export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;
export const SALES_ENDPOINT = `${API_BASE_URL}/sales`;
export const REPORTS_ENDPOINT = `${API_BASE_URL}/dashboard`;
export const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;
export const PROFILE_ENDPOINT = `${API_BASE_URL}/profile`;
export const ORDERS_ENDPOINT = `${API_BASE_URL}/orders`;