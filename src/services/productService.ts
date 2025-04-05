import { PRODUCTS_ENDPOINT } from "@/const/api";
import { NewProduct, Product } from "@/types/productType";
import { QueryParams } from "@/types/utilsAppTypes";
import { apiRequest } from "@/utils/apiRequest";
import { buildUrl } from "@/utils/buildUrl";
 

export const productService = {
  async getProducts(params: QueryParams): Promise<Product[]> {
    const url = buildUrl(PRODUCTS_ENDPOINT, params);
    return apiRequest<Product[]>(url);
  },
  async addProduct(product: NewProduct): Promise<Product> {
    return apiRequest<Product>(PRODUCTS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },
  async updateProduct(id: number, updatedData: Partial<Product>): Promise<Product> {
    const url = `${PRODUCTS_ENDPOINT}/${id}`;
    return apiRequest<Product>(url, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    });
  },
  async removeProduct(id: number): Promise<void> {
    const url = `${PRODUCTS_ENDPOINT}/${id}`;
    return apiRequest<void>(url, {
      method: 'DELETE',
    });
  },
};