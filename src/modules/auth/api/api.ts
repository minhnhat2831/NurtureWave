import { API_ENDPOINTS } from "@/services/api";
import type { loginRequest, loginResponse } from "../schema/LoginSchema.type";
import axiosInstance from "@/services/axio";

export const getLogin = async (
  payload: loginRequest
): Promise<loginResponse> => {
  const res = await axiosInstance.post<loginResponse>(
    API_ENDPOINTS.API_ADMIN_LOGIN,
    payload
  );
  return res.data;
};