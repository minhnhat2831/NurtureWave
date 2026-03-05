import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryListResponse,
  CategoryDetailResponse,
  CategoryQueryParams,
} from "../schema/CategorySchema.type";

/**
/**
 * Get list of categories with pagination, search, filter, sort
 * 
 * @param params
 */
export const getCategories = async (
  params?: CategoryQueryParams
): Promise<CategoryListResponse> => {
  const res = await axiosInstance.get<CategoryListResponse>(
    API_ENDPOINTS.API_ADMIN_CATEGORIES,
    { params }
  );
  return res.data;
};

/**
 * Create new category
 * 
 * @param payload - Category data
 */
export const createCategory = async (
  payload: CreateCategoryRequest
): Promise<CategoryDetailResponse> => {
  const res = await axiosInstance.post<CategoryDetailResponse>(
    API_ENDPOINTS.API_ADMIN_CATEGORIES,
    payload
  );
  return res.data;
};

/**
 * @param id - Category UUID
 * @param payload - Category data
 */
export const updateCategory = async (
  id: string,
  payload: UpdateCategoryRequest
): Promise<CategoryDetailResponse> => {
  const res = await axiosInstance.put<CategoryDetailResponse>(
    API_ENDPOINTS.API_ADMIN_CATEGORIES_ID(id),
    payload
  );
  return res.data;
};

/**
 * @param ids - Array of category UUIDs to delete
 */
export const deleteCategories = async (
  ids: string[]
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete<{ message: string }>(
    API_ENDPOINTS.API_ADMIN_CATEGORIES,
    { data: { ids } }
  );
  return res.data;
};
