import axiosInstance from './axios'
import { API_ENDPOINTS } from './api'

interface SignedUrlResponse {
  message: string
  data: {
    url: string
    fields: {
      acl: string
      success_action_status: string
      bucket: string
      'X-Amz-Algorithm': string
      'X-Amz-Credential': string
      'X-Amz-Date': string
      Policy: string
      'X-Amz-Signature': string
      key: string
    }
  }
}

/**
 * Get presigned URL from backend for S3 upload
 */
export const getSignedUrl = async (type: 'images' | 'videos' = 'images'): Promise<SignedUrlResponse> => {
  const response = await axiosInstance.post<SignedUrlResponse>(
    API_ENDPOINTS.API_MEDIAS_SIGNED_URL,
    { type }
  )
  return response.data
}

/**
 * Upload file to S3 using presigned URL
 * Returns the final URL of uploaded file
 */
export const uploadFileToS3 = async (file: File): Promise<string> => {
  try {
    // Step 1: Get presigned URL
    const signedData = await getSignedUrl('images')
    const { url, fields } = signedData.data

    // Step 2: Prepare form data for S3
    const formData = new FormData()
    
    // Add all fields from signed URL response (must be in order)
    Object.entries(fields).forEach(([key, value]) => {
      if (key === 'key') {
        // Replace ${filename} placeholder with actual filename
        const finalKey = value.replace('${filename}', file.name)
        formData.append(key, finalKey)
      } else {
        formData.append(key, value)
      }
    })
    
    // Add file as last item
    formData.append('file', file)

    // Step 3: Upload to S3
    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!uploadResponse.ok) {
      throw new Error(`S3 upload failed: ${uploadResponse.statusText}`)
    }

    // Step 4: Construct final URL
    const finalKey = fields.key.replace('${filename}', file.name)
    return `${url}/${finalKey}`
  } catch {
    throw new Error('Upload failed')
  }
}
