/**
 * Extract picture URL from API response
 * Backend may return picture as object {id, uri, url, path} or string
 * This helper is shared across all modules (Article, PD, Category, etc.)
 */
export const getPictureUrl = (picture: unknown): string => {
  if (!picture) return ''
  if (typeof picture === 'string') return picture
  if (typeof picture === 'object' && picture !== null) {
    const obj = picture as Record<string, unknown>
    return (obj.uri as string) || (obj.url as string) || (obj.path as string) || ''
  }
  return ''
}
