import { toast } from 'react-toastify'

/**
 * Extract error message from API error response
 * @param error - API error object
 * @returns Error message string
 */
export const getErrorMessage = (error: unknown): string => {
  const err = error as { response?: { data?: { message?: string } } }
  return err.response?.data?.message || ''
}

/**
 * Handle API error with toast notification
 * @param error - API error object
 * @param defaultMessage - Default error message if API doesn't provide one
 */
export const handleApiError = (error: unknown, defaultMessage: string): void => {
  const message = getErrorMessage(error) || defaultMessage
  toast.error(message)
}
