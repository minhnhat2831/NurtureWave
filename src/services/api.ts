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

    //Admin doula
    API_ADMIN_DOULA : '/admins/doulas',
    API_ADMIN_DOULA_ID : (id? : string) => `/admins/doulas/${id}`,

    //Admin client
    API_ADMIN_CLIENT : '/admins/users',
    API_ADMIN_CLIENT_ID : (id? : string) => `/admins/users/${id}`,

    //Doula-subscriptions
    API_DOULA_ID : (id? : string) => `/admins/doulas/${id}`,
    API_DOULA_SUBSCRIPTIONS_ID : (id? : string) => `/admins/doula-subscriptions/${id}`,

    //Doula Package
    API_DOULA_PACKAGE : `/admins/doula-packages`,
    API_DOULA_PACKAGE_ID : (id? : string) => `/admins/doula-packages/${id}`,

    //review
    API_DOULA_REVIEW : `/admins/reviews`,
    API_DOULA_REVIEW_OVERVIEW : `/admins/reviews/overview`,

    //transactions
    API_TRANSACTIONS : '/admins/transactions',
    API_TRANSACTIONS_ID : (id? : string) => `/admins/transactions/${id}`,

    //Cares
    API_CARES : '/admins/cares',
    API_CARES_ID : (id? : string) => `/admins/cares/${id}`,

    //Medias - Upload
    API_MEDIAS_SIGNED_URL : '/medias/signed-url',
}

