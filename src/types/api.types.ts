// ==================== COMMON API RESPONSE TYPE ====================

export interface ApiResponse<T = unknown> {
  success?: boolean
  data: T
  message?: string
  error?: string
  errors?: unknown
}

// ==================== PAGINATION RESPONSE ====================

export interface PaginatedResponse<T = unknown> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ==================== ERROR RESPONSE ====================

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}
