import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";

export interface Category {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
  updatedAt?: string;
}

interface CategoryListResponse {
  message: string;
  data: Category[];
}

/**
 * Get list of categories
 */
export const getCategories = async (): Promise<CategoryListResponse> => {
  const res = await axiosInstance.get<CategoryListResponse>(
    API_ENDPOINTS.API_ADMIN_CATEGORIES
  );
  return res.data;
};
