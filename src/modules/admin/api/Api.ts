import axiosInstance from "@/services/axios"
import { API_ENDPOINTS } from "@/services/api"
import type { 
  adminDetailResponse, 
  createAdminUser, 
  editAdminUser, 
  adminResponse, 
  adminList, 
  adminsParams 
} from "../schema/AdminSchema.type"

export const getAllAdmin = async (
  params: adminsParams
): Promise<adminList> => {
  const response = await axiosInstance.get<adminList>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    { params }
  )
  return response.data
}

export const createAdmin = async (
  data: createAdminUser
): Promise<adminList> => {
  const response = await axiosInstance.post<adminList>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data
}

export const editAdmin = async (
  data: editAdminUser,
  id: string
): Promise<adminList> => {
  const response = await axiosInstance.put<adminList>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id),
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data
}

export const deleteAdmin = async (
  id? : string
): Promise<adminResponse> => {
  const response = await axiosInstance.delete<adminResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}

export const getAdminDetail = async (
  id? : string
) : Promise<adminDetailResponse> => {
  const response = await axiosInstance.get<adminDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}