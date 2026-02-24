import { httpClient } from './api';

export type Product = {
  id?: string | number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  createdAt?: string;
};

export const productService = {
  async getAll(): Promise<Product[]> {
    return httpClient.get<Product[]>('/products');
  },

  async getById(id: string | number): Promise<Product> {
    return httpClient.get<Product>(`/products/${id}`);
  },

  async create(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    return httpClient.post<Product>('/products', product);
  },

  async update(id: string | number, product: Partial<Product>): Promise<Product> {
    return httpClient.put<Product>(`/products/${id}`, product);
  },

  async remove(id: string | number): Promise<void> {
    return httpClient.delete<void>(`/products/${id}`);
	},
};

export default productService;

