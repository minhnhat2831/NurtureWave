import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/LoginSchema";
import type { loginRequest } from "../schema/LoginSchema.type";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getLogin } from "../api/api";

export default function useLoginForm() {
    const navigate = useNavigate()
    const [loading, isLoading] = useState(false)
    const method = useForm<loginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async (data: loginRequest) => {
        try {
            isLoading(true)
            const res = await getLogin(data);

            const { accessToken, refreshToken } = res.data.tokens;
            localStorage.setItem("admin", JSON.stringify(res.data.admin.username))
            //Lưu accessToken và refreshToken
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            navigate(`/static-content`);
            toast("Success")
            isLoading(false)
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            isLoading(false)
        }
    }
    return { method, loading, onSubmit }
}