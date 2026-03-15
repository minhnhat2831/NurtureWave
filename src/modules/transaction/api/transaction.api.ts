import axiosInstance from '@/services/axios'
import type { ApiResponse } from '../../../types/api.types'
import type { CashTransactionPayload } from '../types/transaction.type'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_TRANSACTION_API === 'true'

export const createCashTransaction = async (payload: CashTransactionPayload) => {
  if (USE_MOCK_API) {
    await new Promise<void>(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      data: {
        id: `MOCK_${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString()
      },
      message: 'Transaction created successfully (MOCK)'
    }
  }

  // Real API call
  const response = await axiosInstance.post<ApiResponse>('/transactions/cash', payload)
  return response.data
}
