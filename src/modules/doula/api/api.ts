import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { 
    deleteDoulaResponse, 
    doulaDetailResponse, 
    doulaList, doulaParams, 
    doulaRequest 
} from "../schema/types/DoulaSchema.type";
import type { transactionList, transactionParams } from "../schema/types/TransactionSchema.type";
import type { doulaSubcriptionList } from "../schema/types/DoulaSubcriptionSchema.type";
import type { 
    doulaPackageDetailResponse, 
    doulaPackageList, 
    doulaPackageParams 
} from "../schema/types/DoulaPackageSchema.type";
import type { 
    doulaOverReviewParams, 
    doulaOverReviewResponse, 
    doulaReviewList, 
    doulaReviewParams 
} from "../schema/types/DoulaReviewSchema.type";

export const getAllDoula = async (
    params: doulaParams
): Promise<doulaList> => {
    const respond = await axiosInstance.get<doulaList>(
        API_ENDPOINTS.API_ADMIN_DOULA,
        {
            params
        }
    )
    return respond.data;
}

export const getDoulaDetail = async (
    id?: string
): Promise<doulaDetailResponse> => {
    const response = await axiosInstance.get<doulaDetailResponse>(
        API_ENDPOINTS.API_DOULA_ID(id)
    )
    return response.data
}

export const editDoula = async (
    id: string,
    data: doulaRequest
): Promise<doulaDetailResponse> => {
    const respond = await axiosInstance.put<doulaDetailResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id),
        data
    )
    return respond.data
}

export const deleteDoula = async (
    id?: string
): Promise<deleteDoulaResponse> => {
    const respond = await axiosInstance.delete<deleteDoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const getAllTransaction = async (
    params: transactionParams
): Promise<transactionList> => {
    const response = await axiosInstance.get<transactionList>(
        API_ENDPOINTS.API_TRANSACTIONS,
        {
            params
        }
    )
    return response.data
}

export const getDoulaSubscriptionDetail = async (
    id?: string
): Promise<doulaSubcriptionList> => {
    const response = await axiosInstance.get<doulaSubcriptionList>(
        API_ENDPOINTS.API_DOULA_SUBSCRIPTIONS_ID(id)
    )
    return response.data
}

export const getAllDoulaPackage = async (
    params: doulaPackageParams
): Promise<doulaPackageList> => {
    const response = await axiosInstance.get<doulaPackageList>(
        API_ENDPOINTS.API_DOULA_PACKAGE,
        {
            params
        }
    )
    return response.data
}

export const getDoulaPackageDetail = async (
    id?: string
): Promise<doulaPackageDetailResponse> => {
    const response = await axiosInstance.get(
        API_ENDPOINTS.API_DOULA_PACKAGE_ID(id)
    )
    return response.data
}

export const getAllDoulaReview = async (
    params: doulaReviewParams
): Promise<doulaReviewList> => {
    const response = await axiosInstance.get<doulaReviewList>(
        API_ENDPOINTS.API_DOULA_REVIEW,
        {
            params
        }
    )
    return response.data
}

export const getAllDoulaOverReview = async (
    params: doulaOverReviewParams
): Promise<doulaOverReviewResponse> => {
    const response = await axiosInstance.get<doulaOverReviewResponse>(
        API_ENDPOINTS.API_DOULA_REVIEW_OVERVIEW,
        {
            params
        }
    )
    return response.data
}