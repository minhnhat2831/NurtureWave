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
        const adminData = localStorage.getItem("admin")
        const admin = adminData ? JSON.parse(adminData) : null
        return admin
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