import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type { ParamsType } from "@/constants/SchemaConstants";
import type {
  CreatePDSessionRequest,
  UpdatePDSessionRequest,
  PDSessionListResponse,
  PDSessionDetailResponse,
} from "../schema/PDSessionSchema.type";

/**
 * 
 * @param params - Query parameters
 */
export const getPDSessions = async (
  params?: ParamsType
): Promise<PDSessionListResponse> => {
  const res = await axiosInstance.get<PDSessionListResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    { 
      params: {
        ...params,
        f_type: 'pd', // Always filter by type='pd'
      }
    }
  );
  return res.data;
};

/**
 * @param id - PD Session UUID
 */
export const getPDSessionById = async (
  id: string
): Promise<PDSessionDetailResponse> => {
  const res = await axiosInstance.get<PDSessionDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES_ID(id)
  );
  return res.data;
};

/**
 * Create new PD Session
 * 
 * @param payload - PD Session data including author field
 */
export const createPDSession = async (
  payload: CreatePDSessionRequest
): Promise<PDSessionDetailResponse> => {
  const res = await axiosInstance.post<PDSessionDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    {
      ...payload,
      type: 'pd', // Ensure type is always 'pd'
    }
  );
  return res.data;
};

/**
 * Update existing PD Session
 * 
 * @param id - PD Session UUID
 * @param payload - PD Session data WITHOUT author field
 */
export const updatePDSession = async (
  id: string,
  payload: UpdatePDSessionRequest
): Promise<PDSessionDetailResponse> => {
  const res = await axiosInstance.put<PDSessionDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ARTICLES_ID(id),
    payload
  );
  return res.data;
};

/**
 * 
 * @param ids - Array of PD Session UUIDs to delete
 */
export const deletePDSessions = async (
  ids: string[]
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete<{ message: string }>(
    API_ENDPOINTS.API_ADMIN_ARTICLES,
    { data: { ids } }
  );
  return res.data;
};
