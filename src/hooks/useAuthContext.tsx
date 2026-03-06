import { jwtDecode } from 'jwt-decode'

interface MyTokenPayload {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
}

export default function useAuthContext() {

    function isAuthenticate() {
        const auth = localStorage.getItem("accessToken")
        const refToken = localStorage.getItem("refreshToken")
        if (!auth && !refToken) {
            return false;
        }
        return true;
    }

    function userData() {
        //check valid in localStorage
        const token = localStorage.getItem("accessToken");
        if (!token) return null

        const decoded = jwtDecode<MyTokenPayload>(token)
        return decoded?.username
    }

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    return {
        isAuthenticated: isAuthenticate(),
        user: userData(),
        logout: logout,
    };
}