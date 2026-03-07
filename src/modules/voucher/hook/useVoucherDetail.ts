import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getVoucherDetail, getVoucherUsageHistory } from '../api/api';
import type { VoucherQueryParams, VoucherUsage } from '../schema/VoucherSchema.type';

/**
 * Hook to fetch voucher detail with usage history
 */
export const useVoucherDetail = (id: string) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const params: VoucherQueryParams = {
    page,
    limit,
  };

  // Fetch voucher details
  const { data: voucherData, isLoading: isLoadingVoucher, error: voucherError } = useQuery({
    queryKey: ['voucher-detail', id],
    queryFn: () => getVoucherDetail(id),
    enabled: !!id,
  });

  // Fetch usage history
  const { data: usageData, isLoading: isLoadingUsage } = useQuery({
    queryKey: ['voucher-usage-history', id, page, limit],
    queryFn: () => getVoucherUsageHistory(id, params),
    enabled: !!id,
  });

  // Map doula voucher usage to VoucherUsage format
  const usageHistory: VoucherUsage[] = (usageData?.data || []).map((item) => ({
    id: item.id,
    takenBy: item.doulaUser?.fullName || null,
    takenDate: item.createdAt || '',
  }));

  return {
    voucher: voucherData?.data,
    usageHistory,
    metadata: usageData?.metadata,
    page,
    limit,
    setPage,
    setLimit,
    isLoading: isLoadingVoucher || isLoadingUsage,
    error: voucherError,
  };
};
