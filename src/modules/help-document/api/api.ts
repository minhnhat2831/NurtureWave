import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { deleteHelpDocumentResponse, helpDocumentList, helpDocumentParams, helpDocumentRequest, helpDocumentResponse } from "../schema/HelpDocumentSchema.type";

export const getAllHelpDocument = async (
    params: helpDocumentParams
): Promise<helpDocumentList> => {
    const response = await axiosInstance.get<helpDocumentList>(
        API_ENDPOINTS.API_HELP_DOCUMENT,
        { params }
    )
    return response.data
}

export const getHelpDocumentDetail = async (
    id?: string
): Promise<helpDocumentResponse> => {
    const response = await axiosInstance.get<helpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id)
    )
    return response.data
}

export const createHelpDocument = async (
    data: helpDocumentRequest
): Promise<helpDocumentResponse> => {
    const response = await axiosInstance.post<helpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT,
        data
    )
    return response.data
}

export const editHelpDocument = async (
    id: string,
    data: helpDocumentRequest
): Promise<helpDocumentResponse> => {
    const response = await axiosInstance.put<helpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id),
        data
    )
    return response.data
}

export const deleteHelpDocument = async (
    id?: string
): Promise<deleteHelpDocumentResponse> => {
    const response = await axiosInstance.delete<deleteHelpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id)
    )
    return response.data
}