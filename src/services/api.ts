export const DEFAULT_API = {
    BASE_URL: 'https://dev-api-nurture.vinova.sg/api/v1',
    TIMEOUT : 30000,
    HEADERS : {
        'Content-Type' : 'application/json'
    }
} 

export const API_ENDPOINTS = {
    //Admin auth
    API_ADMIN_LOGIN : '/admins/auth/login',
    API_ADMIN_LOGOUT : '/admins/auth/logout',
    API_REFRESH_TOKEN : '/admins/auth/refresh-access-token',

    //Admin admin
    API_ADMIN_ADMINS : '/admins/admins',
    API_ADMIN_ADMINS_ID : (id? : string) => `/admins/admins/${id}`,

    //Admin articles
    API_ADMIN_ARTICLES : '/admins/articles',
    API_ADMIN_ARTICLES_ID : (id: string) => `/admins/articles/${id}`,
    API_ADMIN_ARTICLES_SLUG : (slug: string) => `/admins/articles/by-slug/${slug}`,

    //Admin categories
    API_ADMIN_CATEGORIES : '/admins/categories',
    API_ADMIN_CATEGORIES_ID : (id: string) => `/admins/categories/${id}`,

    //Medias - Upload
    API_MEDIAS_SIGNED_URL : '/medias/signed-url',
}

