/**
 * Types partagés pour les composants e-commerce
 */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  stock: number;
  category: string;
  createdAt?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: number;
}

export interface User {
  id: number;
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  avatar?: string;
  phone?: string;
  createdAt?: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  createdAt: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  count?: number;
}

export interface Notification {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  id?: string;
}

export interface FilterOptions {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  inStock?: boolean;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
}
