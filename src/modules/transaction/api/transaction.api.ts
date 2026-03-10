import axiosInstance from '@/services/axios'
import type { ApiResponse } from '../../../types/api.types'
import type { CashTransactionPayload } from '../types/transaction.type'

const MOCK_API = true

export const createCashTransaction = async (payload: CashTransactionPayload) => {
  if (MOCK_API) {
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
