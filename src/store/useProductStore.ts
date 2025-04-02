import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product, NewProduct, AppError } from '../types';
import { PRODUCTS_ENDPOINT } from '@/const/api';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: AppError | string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: NewProduct) => Promise<void>;
  updateProduct: (id: number, updatedData: Partial<Product>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

const useProductStore = create<ProductState>()(
  //TODO: implementar token y manejador global de errores
  devtools(
    (set) => ({
      products: [],
      loading: false,
      error: null,
      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {          
          const response = await fetch(PRODUCTS_ENDPOINT);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: Product[] = await response.json();
          set({ products: data, loading: false, error: null });
        } catch (error) {
          const appError: AppError = {
            message: 'No se pudieron cargar los productos',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },
      addProduct: async (product: NewProduct) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(PRODUCTS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
          });
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
          }
          const newProduct: Product = await response.json();
          set((state) => ({
            products: [...state.products, newProduct],
            loading: false,
            error: null,
          }));
        } catch (error) {
          const appError: AppError = {
            message: 'Error al agregar el producto',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },
      updateProduct: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
          });
          const updatedProduct: Product = await response.json();
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
          }
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? updatedProduct : p
            ),
            loading: false,
            error: null,
          }));
        } catch (error) {
          const appError: AppError = {
            message: 'Error al actualizar el producto',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },
      removeProduct: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, { method: 'DELETE' });
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
          }
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            loading: false,
            error: null,
          }));
        } catch (error) {
          const appError: AppError = {
            message: 'Error al remover el producto',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },
    })
  )
);

export default useProductStore;