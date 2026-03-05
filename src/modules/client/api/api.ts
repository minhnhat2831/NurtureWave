import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type { clientList, clientRequest, clientResponse, clientParams } from "../schema/types/ClientSchema.type";
import type { caresList, caresParams } from "../schema/types/CareSchema.type";

export const getAllClient = async (
    params: clientParams
): Promise<clientList> => {
    const response = await axiosInstance.get<clientList>(
        API_ENDPOINTS.API_ADMIN_CLIENT,
        { params }
    )
    return response.data
}

export const getClientDetail = async (
    id?: string
): Promise<clientResponse> => {
    const response = await axiosInstance.get<clientResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id)
    )
    return response.data
}

export const editClient = async (
    id: string,
    data: clientRequest
): Promise<clientResponse> => {
    const response = await axiosInstance.put<clientResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id),
        data
    )
    return response.data
}

export const deleteClient = async (
    id?: string
): Promise<clientResponse> => {
    const response = await axiosInstance.delete<clientResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id)
    )
    return response.data
}

export const getAllCares = async (
    params: caresParams
): Promise<caresList> => {
    const response = await axiosInstance.get<caresList>(
        API_ENDPOINTS.API_CARES,
        { params }
    )
    return response.data
}