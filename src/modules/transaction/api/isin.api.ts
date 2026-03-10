import axiosInstance from '@/services/axios'
import type { Isin, IsinHolding } from '../types/transaction.type'
import type { ApiResponse } from '../../../types/api.types'
import { mockIsins, mockIsinHolding } from '../mock-data/isin'

export const fetchListIsin = async () => {
  try {
    const response = await axiosInstance.get<ApiResponse<Isin[]>>('/isins')
    return response.data
  } catch {
    return { data: mockIsins }
  }
}

export const fetchIsinHolding = async (isin?: string) => {
  if (!isin) {
    return { data: [] }
  }
  
  try {
    const response = await axiosInstance.get<ApiResponse<IsinHolding[]>>(`/isins/${isin}/holdings`)
    return response.data
  } catch {
    return { data: mockIsinHolding[isin] || [] }
  }
}

export const fetchIsinDetail = async (isin: string) => {
  try {
    const response = await axiosInstance.get<ApiResponse<Isin>>(`/isins/${isin}`)
    return response.data
  } catch {
    const mockIsin = mockIsins.find(i => i.isin === isin)
    return { data: mockIsin || { isin, securityName: '', currency: '' } }
  }
}
