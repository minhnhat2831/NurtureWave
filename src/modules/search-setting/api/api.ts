import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { searchSettingList, searchSettingParams, searchSettingRequest, searchSettingResponse } from "../schema/SearchSettingSchema.type";

export const getAllSearchSetting = async (
    params: searchSettingParams
): Promise<searchSettingList> => {
    const response = await axiosInstance.get<searchSettingList>(
        API_ENDPOINTS.API_SEARCH_SETTING,
        { params }
    )
    return response.data
}

export const createSearchSetting = async (
    data: searchSettingRequest
): Promise<searchSettingResponse> => {
    const response = await axiosInstance.post<searchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING,
        data
    )
    return response.data
}

export const editSearchSetting = async (
    id: string,
    data: searchSettingRequest
): Promise<searchSettingResponse> => {
    const response = await axiosInstance.put<searchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING_ID(id),
        data
    )
    return response.data
}

export const deleteSearchSetting = async (
    id?: string
): Promise<searchSettingResponse> => {
    const response = await axiosInstance.delete<searchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING_ID(id),
    )
    return response.data
}