import { useTableManager } from '@/hooks/useTableManager';
import { getVouchers } from '../api/api';

export const useVoucherList = () => {
  return useTableManager({
    queryKey: ['vouchers'],
    queryFn: async (params) => {
      const response = await getVouchers(params);
      return {
        data: response.data,
        metadata: response.metadata
      };
    },
    defaultLimit: 10,
  });
};
