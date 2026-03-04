import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type {
  CreateArticleRequest,
  UpdateArticleRequest,
  ArticleListResponse,
  ArticleDetailResponse,
  ArticleQueryParams,
} from "../schema/ArticleSchema.type";

/**
 * ARTICLE API LAYER
 * All API calls for Article CRUD operations
 */

/**
 * Get list of articles with pagination, search, filter, sort
 * 
 * @param params - Query parameters
 * - page, limit, offset: Pagination
 * - search: Search in title, author, category
 * - sort: Sort by id, title, status, author, createdAt, updatedAt, category.name
 * - f_status: Filter by status (draft, published, unpublished)
 * - f_type: Filter by type (article, pd)
 * - f_categoryId: Filter by category UUID
 */
export const getArticles = async (
  params?: ArticleQueryParams
): Promise<ArticleListResponse> => {
  const res = await axiosInstance.get<ArticleListResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    { params }
  );
  return res.data;
};

/**
 * Get single article by ID
 * Used for edit form autofill
 * 
 * @param id - Article UUID
 */
export const getArticleById = async (
  id: string
): Promise<ArticleDetailResponse> => {
  const res = await axiosInstance.get<ArticleDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES_ID(id)
  );
  return res.data;
};

/**
 * Create new article
 * 
 * @param payload - Article data including author field
 */
export const createArticle = async (
  payload: CreateArticleRequest
): Promise<ArticleDetailResponse> => {
  const res = await axiosInstance.post<ArticleDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    payload
  );
  return res.data;
};

/**
 * Update existing article
 * Note: Does NOT include author field in payload (per API spec)
 * 
 * @param id - Article UUID
 * @param payload - Article data WITHOUT author field
 */
export const updateArticle = async (
  id: string,
  payload: UpdateArticleRequest
): Promise<ArticleDetailResponse> => {
  const res = await axiosInstance.put<ArticleDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES_ID(id),
    payload
  );
  return res.data;
};

/**
 * Delete multiple articles (bulk delete)
 * 
 * @param ids - Array of article UUIDs to delete
 */
export const deleteArticles = async (
  ids: string[]
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete<{ message: string }>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    { data: { ids } }
  );
  return res.data;
};
