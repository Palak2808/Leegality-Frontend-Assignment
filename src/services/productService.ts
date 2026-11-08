import axios from "axios";
import type {
  Product,
  ProductCategory,
  ProductResponse,
} from "../types/product";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export const getProducts = async (): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>("/products", {
    params: {
      limit: 0,
    },
  });

  return response.data;
};

export const getCategories = async (): Promise<ProductCategory[]> => {
  const response = await api.get<ProductCategory[]>("/products/categories");

  return response.data;
};

export const getProductsByCategory = async (
  category: string
): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>(
    `/products/category/${encodeURIComponent(category)}`
  );

  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
};