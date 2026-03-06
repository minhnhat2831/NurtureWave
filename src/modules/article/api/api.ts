import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type {
  CreateArticleRequest,
  UpdateArticleRequest,
  ArticleListResponse,
  ArticleDetailResponse,
  ArticleQueryParams,
} from "../schema/ArticleSchema.type";
import { 
  articleListResponseSchema, 
  articleDetailResponseSchema 
} from "../schema/ArticleSchema";


/**
 * Get list of articles with pagination, search, filter, sort
 * 
 * @param params 
 */
export const getArticles = async (
  params?: ArticleQueryParams
): Promise<ArticleListResponse> => {
  const res = await axiosInstance.get<ArticleListResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    { params }
  );
  // Runtime validation: Validate API response matches schema
  return articleListResponseSchema.parse(res.data);
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
  // Runtime validation
  return articleDetailResponseSchema.parse(res.data);
};

/**
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
  // Runtime validation
  return articleDetailResponseSchema.parse(res.data);
};

/**
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
  // Runtime validation
  return articleDetailResponseSchema.parse(res.data);
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
