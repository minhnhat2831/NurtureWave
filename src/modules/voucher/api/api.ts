import { API_ENDPOINTS } from '@/services/api';
import axiosInstance from '@/services/axios';
import {
  type VoucherListResponse,
  type VoucherDetailResponse,
  type VoucherQueryParams,
  type CreateVoucherData,
} from '../schema/VoucherSchema.type';

/**
 * Get all vouchers with pagination, search, sort, and filters
 * @param params - Query parameters
 * @returns Paginated voucher list with metadata
 */
export const getVouchers = async (
  params?: VoucherQueryParams
): Promise<VoucherListResponse> => {
  const response = await axiosInstance.get<VoucherListResponse>(API_ENDPOINTS.API_ADMIN_VOUCHERS, { params });
  return response.data;
};

/**
 * Create a new voucher
 * @param data - Voucher data
 * @returns Created voucher
 */
export const createVoucher = async (
  data: CreateVoucherData
): Promise<VoucherDetailResponse> => {
  const response = await axiosInstance.post<VoucherDetailResponse>(API_ENDPOINTS.API_ADMIN_VOUCHERS, data);
  return response.data;
};

/**
 * Delete multiple vouchers by IDs
 * @param ids - Array of voucher IDs to delete
 * @returns Success status
 */
export const deleteVouchers = async (
  ids: string[]
): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(API_ENDPOINTS.API_ADMIN_VOUCHERS, {
    data: { ids },
  });
  return response.data;
};
