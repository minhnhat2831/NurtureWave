import { API_ENDPOINTS } from '@/services/api';
import axiosInstance from '@/services/axios';
import {
  type VoucherListResponse,
  type VoucherDetailResponse,
  type DoulaVoucherUsageListResponse,
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

/**
 * Get voucher details
 * @param id - Voucher ID
 * @returns Voucher details
 */
export const getVoucherDetail = async (
  id: string
): Promise<VoucherDetailResponse> => {
  const response = await axiosInstance.get<VoucherDetailResponse>(
    API_ENDPOINTS.API_ADMIN_VOUCHERS_ID(id)
  );
  return response.data;
};

/**
 * Get voucher usage history (doulas who used this voucher)
 * @param voucherId - Voucher ID to filter
 * @param params - Query parameters for pagination
 * @returns List of doulas who used the voucher
 */
export const getVoucherUsageHistory = async (
  voucherId: string,
  params?: VoucherQueryParams
): Promise<DoulaVoucherUsageListResponse> => {
  const response = await axiosInstance.get<DoulaVoucherUsageListResponse>(
    API_ENDPOINTS.API_ADMIN_DOULA_VOUCHERS,
    { params: { ...params, f_voucherId: voucherId } }
  );
  return response.data;
};
